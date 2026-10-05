import { describe, expect, it, vi } from "vitest";
import { mockFetch, sentJson, silenceConsole } from "@/tests/helpers";
import { reportError } from "./monitoring";
import { brevoPost } from "./brevo";

vi.mock("./monitoring", () => ({ reportError: vi.fn() }));

describe("brevoPost", () => {
  it("posts JSON with the API key and returns true on 2xx", async () => {
    const fetchMock = mockFetch(201);
    expect(await brevoPost("/smtp/email", "key", { a: 1 }, "test")).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    expect((init?.headers as Record<string, string>)["api-key"]).toBe("key");
    expect(sentJson(fetchMock)).toEqual({ a: 1 });
  });

  it("returns false and reports Brevo refusals", async () => {
    silenceConsole();
    mockFetch(400, { code: "invalid_parameter" });
    expect(await brevoPost("/x", "key", {}, "subscribe")).toBe(false);
    expect(reportError).toHaveBeenCalledWith("subscribe", "Brevo refused the request", {
      path: "/x",
      status: 400,
      code: "invalid_parameter",
    });
  });

  it("throws on network errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    await expect(brevoPost("/x", "key", {}, "test")).rejects.toThrow("down");
  });
});
