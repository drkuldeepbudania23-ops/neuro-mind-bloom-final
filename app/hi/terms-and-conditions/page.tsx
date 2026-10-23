import PolicyPage, { policyMetadata } from "../../../components/content/PolicyPage";

export const metadata = policyMetadata("terms-and-conditions", "hi");

export default function Page() {
  return <PolicyPage slug="terms-and-conditions" lang="hi" />;
}
