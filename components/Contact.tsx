"use client";

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { profile, useProfileText } from "@/data/profile";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * Cierre: solo contacto. La sección "Qué busco" se retiró a propósito —el
 * enfoque profesional ya se lee en "Sobre mí" y en el cierre de "Mi
 * historia", y repetirlo aquí alargaba la página sin añadir nada.
 */
export default function Contact() {
  const { locale } = useLocale();
  const t = uiStrings[locale].contact;
  const text = useProfileText();

  return (
    <section id="contacto" className="scroll-mt-20 bg-bg py-20 sm:py-32">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-10 px-6 sm:px-10">
        <SectionHead index="05" label={t.sectionLabel} />

        <Reveal>
          <h2 className="display max-w-[12ch] text-[clamp(2.5rem,9vw,7.5rem)] text-fg">
            {t.title}
          </h2>
        </Reveal>

        <Reveal>
          <a
            href={profile.links.email}
            className="link-underline inline-block text-[clamp(1.35rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em] text-fg"
          >
            {profile.links.emailDisplay}
          </a>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule pt-8">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono link-underline text-fg"
            >
              GitHub ↗
            </a>
            {profile.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mono link-underline text-fg"
              >
                LinkedIn ↗
              </a>
            )}
            <a
              href={profile.links.nexos}
              target="_blank"
              rel="noopener noreferrer"
              className="mono link-underline text-fg"
            >
              NexOS ↗
            </a>
            {text.cvUrl ? (
              <a
                href={text.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mono link-underline text-fg"
              >
                {t.descargarCv}
              </a>
            ) : (
              <span
                className="mono cursor-not-allowed text-fg-3 opacity-60"
                aria-disabled="true"
                title={t.cvProximamente}
                tabIndex={-1}
              >
                {t.descargarCv}
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
