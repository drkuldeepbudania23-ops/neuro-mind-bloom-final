import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SelfAssessment from "../../../components/assessment/SelfAssessment";
import { conditionNamesFor, isTest, selfTestMetadata, selfTestParams } from "../../../lib/content/selfTestPages";

type Props = { params: Promise<{ test: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return selfTestParams();
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return selfTestMetadata((await params).test, "en");
}
export default async function Page({ params }: Props) {
  const { test } = await params;
  if (!isTest(test)) notFound();
  return <SelfAssessment lang="en" initial={test} conditionNames={conditionNamesFor(test)} />;
}
