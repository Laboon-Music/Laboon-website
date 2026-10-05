import { LegalPage, legalMetadata } from "@/components/legal/LegalPage";

export const metadata = legalMetadata("cgu");

export default function Page() {
  return <LegalPage slug="cgu" />;
}
