import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata = legalMetadata("charte");

export default function Page() {
  return <LegalPage slug="charte" />;
}
