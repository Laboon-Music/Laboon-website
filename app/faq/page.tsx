import type { Metadata } from "next";
import { Faq, FAQ_TITLE } from "@/components/faq/Faq";
import { PageShell } from "@/components/layout";

export const metadata: Metadata = {
  title: FAQ_TITLE,
  description:
    "Les réponses à tes questions sur Laboon : fonctionnement, lancement, tarifs, données et contact.",
};

export default function FaqPage() {
  return (
    <PageShell footer>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Faq />
      </div>
    </PageShell>
  );
}
