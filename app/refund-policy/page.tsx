import PolicyPage, { policyMetadata } from "../../components/content/PolicyPage";

export const metadata = policyMetadata("refund-policy", "en");

export default function Page() {
  return <PolicyPage slug="refund-policy" lang="en" />;
}
