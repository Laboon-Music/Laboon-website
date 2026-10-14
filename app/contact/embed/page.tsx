import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

/**
 * Bare variant of the contact form, loaded by the mobile app in a WebView at
 * `/contact/embed`. No site chrome, tighter padding, `noindex` (duplicate of /contact).
 */
export const metadata: Metadata = {
  title: "Contact — Laboon",
  robots: { index: false, follow: false },
};

export default function ContactEmbedPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-8">
      <p className="mb-6 text-muted">
        Une question, une idée, un problème ? Écris-nous, on lit tout.
      </p>
      <ContactForm />
    </main>
  );
}
