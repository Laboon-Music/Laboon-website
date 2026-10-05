import MentionsLegales from "@/components/legal/content/fr/MentionsLegales";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata = { title: "Mentions légales — Laboon" };

export default function Page() {
  return (
    <LegalPageShell>
      <MentionsLegales />
    </LegalPageShell>
  );
}
