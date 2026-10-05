import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { TrackSignupConfirmed } from "@/components/newsletter/TrackSignupConfirmed";
import SocialLinks from "@/components/social/SocialLinks";
import { ButtonLink, Card } from "@/components/ui";

export const metadata: Metadata = { title: "Inscription confirmée — Laboon" };

// Landing page after clicking the link in the Brevo confirmation email (double
// opt-in). Brevo redirects here once the contact is added to the lists.
// See docs/features/newsletter-signup.md.
export default function InscriptionConfirmeePage() {
  return (
    <PageShell>
      <TrackSignupConfirmed />
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Card className="text-center">
          <h1 className="text-2xl font-bold">
            Inscription confirmée <span className="text-accent">✓</span>
          </h1>
          <p className="mt-4 text-muted">
            Merci ! Ton adresse est validée. On te tiendra au courant du lancement de
            Laboon 🎶
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-muted">
              En attendant, suis-nous pour ne rien rater :
            </p>
            <SocialLinks size="lg" />
          </div>
          <ButtonLink href="/" className="mt-8">
            Retour à l&apos;accueil
          </ButtonLink>
        </Card>
      </section>
    </PageShell>
  );
}
