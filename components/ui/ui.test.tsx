import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Button,
  ButtonLink,
  buttonClass,
  Card,
  Field,
  FormError,
  Honeypot,
  Input,
  TextLink,
} from ".";

describe("design system", () => {
  it("Button defaults to type=button and merges classes", () => {
    render(<Button className="mt-2">Go</Button>);
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("from-brand");
    expect(button.className).toContain("mt-2");
  });

  it("buttonClass supports variants and full width", () => {
    expect(buttonClass({ variant: "outline" })).toContain("border-border");
    expect(buttonClass({ fullWidth: true })).toContain("w-full");
  });

  it("ButtonLink renders a link styled as a button", () => {
    render(<ButtonLink href="/contact">Contact</ButtonLink>);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("Field labels its control", () => {
    render(
      <Field label="Nom">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
  });

  it("Input tone switches the background", () => {
    render(<Input tone="page" aria-label="a" />);
    expect(screen.getByLabelText("a").className).toContain("bg-surface");
  });

  it("FormError renders nothing without a message", () => {
    const { container } = render(<FormError>{false}</FormError>);
    expect(container).toBeEmptyDOMElement();
  });

  it("Honeypot is hidden from humans and assistive tech", () => {
    const { container } = render(<Honeypot value="" onChange={() => {}} />);
    const input = container.querySelector("input[name=website]");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(input).toHaveAttribute("aria-hidden", "true");
  });

  it("Card success tone highlights confirmations", () => {
    render(<Card tone="success">ok</Card>);
    expect(screen.getByText("ok").className).toContain("border-accent/40");
  });
});

describe("TextLink", () => {
  it("is underlined and uses next/link for internal paths", () => {
    render(<TextLink href="/cgu">CGU</TextLink>);
    const link = screen.getByRole("link", { name: "CGU" });
    expect(link).toHaveAttribute("href", "/cgu");
    expect(link.className).toContain("underline");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens external URLs in a new tab", () => {
    render(<TextLink href="https://example.com">ext</TextLink>);
    expect(screen.getByRole("link", { name: "ext" })).toHaveAttribute("target", "_blank");
  });

  it("keeps mailto links in the same tab", () => {
    render(<TextLink href="mailto:a@b.co">mail</TextLink>);
    expect(screen.getByRole("link", { name: "mail" })).not.toHaveAttribute("target");
  });
});
