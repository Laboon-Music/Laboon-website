import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FAQ_CONTENT } from "@/content/faq";
import { CONTACT_EMAIL } from "@/lib/site";
import { Faq } from "./Faq";
import { RichText } from "./RichText";

describe("RichText", () => {
  it("turns [label](address) into links and keeps the rest", () => {
    render(
      <p>
        <RichText text="Va sur [le site](/faq) ou écris à [nous](mailto:a@b.co)." />
      </p>,
    );
    expect(screen.getByRole("link", { name: "le site" })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: "nous" })).toHaveAttribute(
      "href",
      "mailto:a@b.co",
    );
    expect(screen.getByText(/Va sur/)).toHaveTextContent(
      "Va sur le site ou écris à nous.",
    );
  });

  it("renders plain text untouched", () => {
    render(<RichText text="Rien à signaler" />);
    expect(screen.getByText("Rien à signaler")).toBeInTheDocument();
  });
});

describe("Faq", () => {
  it("shows every question once, grouped under headings", () => {
    render(<Faq />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      FAQ_CONTENT.title,
    );
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      FAQ_CONTENT.groups.length,
    );
    const questions = FAQ_CONTENT.groups.flatMap((g) => g.items.map((i) => i.question));
    for (const question of questions) {
      expect(screen.getAllByText(question)).toHaveLength(1);
    }
  });

  it("links to the waiting list, legal pages and contact", () => {
    render(<Faq />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        "/#inscription",
        "/confidentialite",
        "/charte",
        "/contact",
        `mailto:${CONTACT_EMAIL}`,
      ]),
    );
  });

  it("only uses the official contact address", () => {
    render(<Faq />);
    const text = document.body.textContent ?? "";
    for (const email of text.match(/[\w.+-]+@[\w-]+(\.\w+)+/g) ?? []) {
      expect(email).toBe(CONTACT_EMAIL);
    }
  });
});
