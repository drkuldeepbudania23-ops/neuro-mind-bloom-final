import PolicyPage, { policyMetadata } from "../../components/content/PolicyPage";

export const metadata = policyMetadata("terms-and-conditions", "en");

export default function Page() {
  return <PolicyPage slug="terms-and-conditions" lang="en" />;
}
