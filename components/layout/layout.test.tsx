import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageShell } from ".";

describe("PageShell", () => {
  it("renders the logo linking home, the content and no footer by default", () => {
    render(<PageShell>content</PageShell>);
    expect(screen.getByRole("link", { name: "Laboon — accueil" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });

  it("renders header actions and the footer on demand", () => {
    render(
      <PageShell footer logoAsLink={false} headerActions={<a href="#x">Rejoindre</a>}>
        x
      </PageShell>,
    );
    expect(screen.getByRole("link", { name: "Rejoindre" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mentions légales" })).toHaveAttribute(
      "href",
      "/mentions-legales",
    );
  });
});

describe("PageShell accessibility", () => {
  it("offers a skip link to the main content", () => {
    render(<PageShell>content</PageShell>);
    const skip = screen.getByRole("link", { name: "Aller au contenu" });
    expect(skip).toHaveAttribute("href", "#contenu");
    expect(screen.getByRole("main")).toHaveAttribute("id", "contenu");
    expect(screen.getByRole("main")).toHaveTextContent("content");
  });
});
