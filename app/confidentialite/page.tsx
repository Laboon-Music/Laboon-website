import Confidentialite from "@/components/legal/content/fr/Confidentialite";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata = { title: "Politique de confidentialité — Laboon" };

export default function Page() {
  return (
    <LegalPageShell>
      <Confidentialite />
    </LegalPageShell>
  );
}
