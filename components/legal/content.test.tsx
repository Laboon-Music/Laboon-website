import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL } from "@/lib/site";
import { getLegalDoc, LEGAL_SLUGS } from "./registry";

describe("legal documents content", () => {
  it.each(LEGAL_SLUGS)("%s only uses the official contact address", (slug) => {
    const { Component } = getLegalDoc("fr", slug).entry;
    const { container } = render(<Component />);
    // Scan each text node separately (textContent glues adjacent blocks).
    const emails: string[] = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      emails.push(
        ...(walker.currentNode.textContent?.match(/[\w.+-]+@[\w-]+(\.\w+)+/g) ?? []),
      );
    }
    for (const email of emails) expect(email).toBe(CONTACT_EMAIL);
    container.querySelectorAll("a[href^='mailto:']").forEach((a) => {
      expect(a.getAttribute("href")).toBe(`mailto:${CONTACT_EMAIL}`);
    });
  });
});
