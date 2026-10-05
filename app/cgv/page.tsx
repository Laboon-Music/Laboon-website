import Cgv from "@/components/legal/content/fr/Cgv";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata = { title: "Conditions Générales de Vente — Laboon" };

export default function Page() {
  return (
    <LegalPageShell>
      <Cgv />
    </LegalPageShell>
  );
}
