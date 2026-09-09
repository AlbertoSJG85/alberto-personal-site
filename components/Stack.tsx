"use client";

import Reveal from "./Reveal";
import Disclosure from "./Disclosure";
import { stackGroups } from "@/data/stack";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * Stack en rejilla de bloques con chips, no en párrafos: se lee de un
 * vistazo qué hay en cada área. Sin barras de nivel ni porcentajes.
 *
 * `stackGroups` no se traduce: los títulos de grupo ya están en inglés
 * ("Core", "AI & Automation"...) y los ítems son nombres de tecnologías,
 * iguales en cualquier idioma.
 */
export default function Stack() {
  const { locale } = useLocale();
  const t = uiStrings[locale].stack;

  return (
    <Disclosure sectionId="stack" index="03" title={t.title}>
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {stackGroups.map((group, i) => (
          <Reveal key={group.id}>
            <div className="flex h-full flex-col gap-5 bg-bg p-7 sm:p-9">
              <div className="flex items-baseline gap-4">
                <span className="mono index text-accent">{`0${i + 1}`}</span>
                <h3 className="text-xl font-bold tracking-tight text-fg">{group.title}</h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="mono-sm border border-rule-strong px-2.5 py-1.5 text-fg-2 transition-colors duration-200 hover:border-accent hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Disclosure>
  );
}
