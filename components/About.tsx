"use client";

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { useProfileText } from "@/data/profile";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * Sobre mí: solo texto. El retrato de esta parte de la página es el de la
 * portada, que está justo encima y sigue en pantalla al empezar a leer; no
 * se repite otra foto aquí. La segunda imagen aparece dentro de "Mi
 * historia", y solo si se despliega.
 */
export default function About() {
  const profile = useProfileText();
  const { locale } = useLocale();

  return (
    <section id="sobre-mi" className="scroll-mt-20 border-b border-rule bg-bg py-20 sm:py-28">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-10 px-6 sm:px-10">
        <SectionHead index="01" label={uiStrings[locale].about.sectionLabel} />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[clamp(2rem,5.4vw,4.5rem)] text-fg">
              {profile.storyTitle}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-6 lg:pt-3">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg-2">{profile.heroText}</p>
            </Reveal>
            <Reveal>
              <p className="text-lg leading-relaxed text-fg-2">{profile.heroSecondLine}</p>
            </Reveal>
            <Reveal>
              <p className="border-l-2 border-accent pl-5 text-lg font-semibold leading-snug tracking-tight text-fg">
                {profile.secondSentence}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
