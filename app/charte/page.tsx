import Charte from "@/components/legal/content/fr/Charte";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata = { title: "Charte de Bonne Conduite — Laboon" };

export default function Page() {
  return (
    <LegalPageShell>
      <Charte />
    </LegalPageShell>
  );
}
