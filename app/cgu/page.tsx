import Cgu from "@/components/legal/content/fr/Cgu";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata = { title: "Conditions Générales d'Utilisation — Laboon" };

export default function Page() {
  return (
    <LegalPageShell>
      <Cgu />
    </LegalPageShell>
  );
}
