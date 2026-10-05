// Contact form configuration shared by the form (client) and the API (server).

/** Subjects offered in the form; the label ends up in the email subject. */
export const CONTACT_SUBJECTS = [
  { value: "question", label: "Une question", emailLabel: "Question" },
  { value: "beta", label: "Beta / tests", emailLabel: "Beta / tests" },
  {
    value: "partenariat",
    label: "Partenariat / presse",
    emailLabel: "Partenariat / presse",
  },
  { value: "bug", label: "Signaler un problème", emailLabel: "Signaler un problème" },
  { value: "autre", label: "Autre", emailLabel: "Autre" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];

export const DEFAULT_CONTACT_SUBJECT: ContactSubject = "question";

export const CONTACT_LIMITS = {
  nameMax: 100,
  messageMin: 10,
  messageMax: 5000,
} as const;

/** Email label for a subject value; unknown values fall back to "Autre". */
export function subjectEmailLabel(value: unknown): string {
  const match = CONTACT_SUBJECTS.find((s) => s.value === value);
  return (match ?? CONTACT_SUBJECTS[CONTACT_SUBJECTS.length - 1]).emailLabel;
}
