import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConditionPage from "../../../components/content/ConditionPage";
import { CONDITIONS, getCondition } from "../../../lib/content/conditions";
import { conditionMetadata } from "../../../lib/content/conditionMetadata";

type Props = { params: Promise<{ condition: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CONDITIONS.map((c) => ({ condition: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return conditionMetadata((await params).condition, "hi");
}

export default async function Page({ params }: Props) {
  const content = getCondition((await params).condition);
  if (!content) notFound();
  return <ConditionPage content={content} lang="hi" />;
}
