import type { ReactNode } from "react";
import { TextLink } from "@/components/ui";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders a text where `[label](address)` becomes a `TextLink`. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <TextLink key={match.index} href={match[2]}>
        {match[1]}
      </TextLink>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
