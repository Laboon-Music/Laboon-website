import { describe, expect, it } from "vitest";
import { CONTACT_SUBJECTS, DEFAULT_CONTACT_SUBJECT, subjectEmailLabel } from "./contact";

describe("subjectEmailLabel", () => {
  it("maps a known subject to its email label", () => {
    expect(subjectEmailLabel("question")).toBe("Question");
    expect(subjectEmailLabel("bug")).toBe("Signaler un problème");
  });

  it("falls back to 'Autre' for unknown values", () => {
    expect(subjectEmailLabel("hack")).toBe("Autre");
    expect(subjectEmailLabel(undefined)).toBe("Autre");
  });

  it("has a default subject that exists", () => {
    expect(CONTACT_SUBJECTS.map((s) => s.value)).toContain(DEFAULT_CONTACT_SUBJECT);
  });
});
