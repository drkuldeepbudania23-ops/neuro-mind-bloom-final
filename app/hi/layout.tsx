import HtmlLang from "../../components/site/HtmlLang";

/** All pages under /hi are Hindi: mark the document language for screen readers and search engines. */
export default function HindiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang lang="hi-IN" />
      {children}
    </>
  );
}
