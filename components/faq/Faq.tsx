import { Disclosure } from "@/components/ui";
import { FAQ_CONTENT } from "@/content/faq";
import { RichText } from "./RichText";

export const FAQ_TITLE = `${FAQ_CONTENT.title} — Laboon`;

/**
 * The FAQ itself. Served both as a public page (with site chrome, `/faq`) and
 * as a bare page loaded by the mobile app WebView (`/faq/embed`).
 */
export function Faq() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">{FAQ_CONTENT.title}</span>
        </h1>
        <p className="mt-3 text-muted">{FAQ_CONTENT.subtitle}</p>
      </header>
      {FAQ_CONTENT.groups.map((group) => (
        <section key={group.title} className="space-y-3">
          <h2 className="text-xl font-semibold text-text">{group.title}</h2>
          {group.items.map((item) => (
            <Disclosure key={item.question} summary={item.question}>
              <p>
                <RichText text={item.answer} />
              </p>
            </Disclosure>
          ))}
        </section>
      ))}
    </article>
  );
}
