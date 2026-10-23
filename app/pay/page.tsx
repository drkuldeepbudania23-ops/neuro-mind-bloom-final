import type { Metadata } from "next";
import PaymentQrPage, { parsePaymentParams } from "../../components/payment/PaymentQrPage";

export const metadata: Metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = parsePaymentParams(await searchParams);
  return <PaymentQrPage lang="en" {...params} />;
}
