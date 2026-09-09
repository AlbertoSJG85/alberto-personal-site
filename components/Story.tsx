"use client";

import Image from "next/image";
import Disclosure from "./Disclosure";
import InlineEmphasis from "./InlineEmphasis";
import { profile, useProfileText } from "@/data/profile";
import { useStoryContent } from "@/data/story";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * "Mi historia": la parte personal —por qué empecé a desarrollar y hasta
 * dónde me llevó— detrás de un desplegable. El retrato secundario solo
 * existe visualmente cuando se abre.
 *
 * El texto (`data/story.ts`) es narrativo y largo por decisión de Alberto:
 * un bloque por etapa, cada uno con su propio titular. A propósito no
 * llevan número — es una historia, no una lista ordenada—: cada bloque se
 * marca con un cuadrado de color de señal en vez de "01, 02, 03...".
 */
export default function Story() {
  const { locale } = useLocale();
  const t = uiStrings[locale].story;
  const { eyebrow, beats, closing } = useStoryContent();
  const profileText = useProfileText();

  return (
    <Disclosure sectionId="historia" index="02" title={t.title}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {profile.photoSecondaryUrl && (
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs self-start sm:max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
            <Image
              src={profile.photoSecondaryUrl}
              alt={profileText.photoAlt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 70vw, 32vw"
              className="portrait object-cover object-top"
            />
            <span className="portrait-blend" aria-hidden="true" />
          </div>
        )}

        <div className="flex flex-col gap-10">
          <p className="mono text-fg-3">{eyebrow}</p>

          {beats.map((beat) => (
            <div
              key={beat.heading}
              className="flex flex-col gap-4 border-t border-rule pt-8 first:border-t-0 first:pt-0"
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-2 h-2.5 w-2.5 shrink-0 bg-accent sm:mt-2.5"
                  aria-hidden="true"
                />
                <h3 className="font-body text-xl leading-snug tracking-tight text-fg sm:text-2xl">
                  <InlineEmphasis text={beat.heading} />
                </h3>
              </div>

              <div className="flex flex-col gap-4 sm:pl-12">
                {beat.paragraphs.map((paragraph, j) => (
                  <p key={j} className="max-w-2xl text-base leading-relaxed text-fg-2 sm:text-lg">
                    <InlineEmphasis text={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          ))}

          <p className="max-w-2xl border-t border-rule pt-6 text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
            {closing}
          </p>
        </div>
      </div>
    </Disclosure>
  );
}
