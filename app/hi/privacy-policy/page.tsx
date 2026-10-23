import PolicyPage, { policyMetadata } from "../../../components/content/PolicyPage";

export const metadata = policyMetadata("privacy-policy", "hi");

export default function Page() {
  return <PolicyPage slug="privacy-policy" lang="hi" />;
}
