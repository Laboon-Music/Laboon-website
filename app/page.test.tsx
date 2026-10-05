import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HOME_CONTENT } from "@/content/home";
import Home from "./page";

describe("home page", () => {
  it("renders the texts from content/home.ts", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      `${HOME_CONTENT.hero.title} ${HOME_CONTENT.hero.titleHighlight}`,
    );
    for (const item of [...HOME_CONTENT.features.items, ...HOME_CONTENT.steps.items]) {
      expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument();
    }
  });

  it("has two signup forms and a 'Rejoindre' anchor to the first one", () => {
    render(<Home />);
    expect(screen.getAllByRole("button", { name: "Je m'inscris" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Rejoindre" })).toHaveAttribute(
      "href",
      "#inscription",
    );
  });
});
