import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-2xl font-bold tracking-tight text-white" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-bold tracking-tight text-white" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-grey-300" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-grey-300" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-grey-300" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: ({ href = "", ...props }) => (
    <Link href={href} className="font-semibold text-lime underline underline-offset-4" {...props} />
  ),
  strong: (props) => <strong className="font-bold text-white" {...props} />,
};
