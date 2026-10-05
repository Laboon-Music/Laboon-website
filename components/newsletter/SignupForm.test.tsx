import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { mockFetch, sentJson } from "@/tests/helpers";
import { NO_LIST_ERROR } from "@/lib/newsletter";
import { trackEvent } from "@/lib/analytics";
import SignupForm from "./SignupForm";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("SignupForm", () => {
  it("submits the email, the chosen lists and the anti-bot fields", async () => {
    const fetchMock = mockFetch(200, { ok: true });
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("Adresse email"), "jane@example.com");
    await user.click(screen.getByLabelText("Devenir beta testeur·euse"));
    await user.click(screen.getByRole("button", { name: "Je m'inscris" }));

    expect(fetchMock.mock.calls[0][0]).toBe("/api/subscribe");
    expect(sentJson(fetchMock)).toMatchObject({
      email: "jane@example.com",
      wantsLaunch: true,
      wantsBeta: true,
      website: "",
      turnstileToken: "",
      elapsedMs: expect.any(Number),
    });
    expect(await screen.findByText(/Vérifie ta boîte mail/)).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("signup_submitted", {
      launch: true,
      beta: true,
    });
  });

  it("requires at least one list without calling the API", async () => {
    const fetchMock = mockFetch();
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.click(screen.getByLabelText("Me prévenir du lancement"));
    await user.click(screen.getByRole("button", { name: "Je m'inscris" }));

    expect(screen.getByRole("alert")).toHaveTextContent(NO_LIST_ERROR);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the API error message", async () => {
    mockFetch(400, { error: "Adresse email invalide." });
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.click(screen.getByRole("button", { name: "Je m'inscris" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Adresse email invalide.");
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
