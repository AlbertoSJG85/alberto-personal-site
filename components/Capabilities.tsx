"use client";

import Reveal from "./Reveal";
import { useCapabilities } from "@/data/capabilities";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * Banda de prueba rápida justo bajo la portada: cuatro columnas, mono, sin
 * tarjetas. Es parte del cierre visual del hero, no una sección propia.
 */
export default function Capabilities() {
  const capabilities = useCapabilities();
  const { locale } = useLocale();

  return (
    <section aria-label={uiStrings[locale].capabilities.ariaLabel} className="border-y border-rule bg-bg">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.title}>
              <div
                className={`flex h-full flex-col gap-2 border-rule py-7 ${
                  // La regla vertical solo separa columnas: la primera de
                  // cada fila no la lleva (2 columnas en sm, 4 en lg).
                  i % 2 === 0 ? "sm:pl-0 lg:border-l lg:pl-7" : "sm:border-l sm:pl-7"
                } ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
              >
                <span className="mono index text-accent">{`0${i + 1}`}</span>
                <span className="text-lg font-bold tracking-tight text-fg">
                  {capability.title}
                </span>
                <span className="mono-sm text-fg-3">{capability.description}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
