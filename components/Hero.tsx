"use client";

import { useRef } from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";
import FitText from "./FitText";
import MatchWidth from "./MatchWidth";
import { profile, useProfileText } from "@/data/profile";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * Portada a pantalla completa. El retrato no vive en una columna separada:
 * ocupa el fondo y se funde con el negro, y la tipografía se apoya encima.
 * Foto y nombre son una sola pieza, no dos bloques enfrentados.
 *
 * El rol ("Applied AI · Full-Stack...") y la descripción se alinean al
 * ancho real del nombre (ver `MatchWidth`) para que las tres líneas acaben
 * justo donde acaba "García" — no rebasan hacia la derecha ni se quedan
 * cortas. El bloque de texto está anclado abajo (`justify-end` + padding
 * inferior fijo): si el rol o la descripción ocupan menos líneas al
 * ensancharse, el bloque crece hacia arriba, nunca empuja el CTA hacia
 * abajo.
 */
export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const text = useProfileText();
  const { locale } = useLocale();
  const t = uiStrings[locale].hero;

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-bg">
      {/*
        Encuadre anclado arriba: el recorte tiene que dejar la cara entera
        por debajo de la cabecera, sin cortarla por el borde superior.
      */}
      {profile.photoUrl && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
          <Image
            src={profile.photoUrl}
            alt={text.photoAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64vw"
            className="portrait object-cover object-[50%_top] lg:object-[42%_top]"
          />
          <span className="portrait-blend" aria-hidden="true" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[88rem] flex-col justify-end px-6 pb-10 pt-28 sm:px-10 sm:pb-14">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          <span className="mono text-fg-2">{text.eyebrow}</span>
        </div>

        <h1 ref={nameRef} className="display mt-6 w-fit text-[clamp(3.1rem,10.2vw,9.25rem)] text-fg">
          Alberto S.
          <br />
          Jiménez García
        </h1>

        <MatchWidth reference={nameRef}>
          {/*
            FitText, no un simple max-width con wrap: ajusta el tamaño de
            letra (encogiendo o creciendo) para que el rol ocupe siempre
            exactamente el ancho del nombre, en una sola línea — termina
            justo donde termina "García", sin dejar hueco ni desbordar.
          */}
          <p className="mt-6">
            <FitText
              text={text.headline}
              containerRef={nameRef}
              baseFontSizePx={22}
              minFontSizePx={13}
              className="font-mono font-medium uppercase tracking-[0.1em] text-fg"
            />
          </p>

          <p className="mt-6 text-base leading-relaxed text-fg-2 sm:text-lg">
            {text.shortDescription}
          </p>
        </MatchWidth>

        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-4 sm:gap-x-8">
          <CTAButton href="#proyectos" variant="solid">
            {t.verProyectos}
          </CTAButton>
          {text.cvUrl ? (
            <CTAButton href={text.cvUrl} external variant="text">
              {t.descargarCv}
            </CTAButton>
          ) : (
            <CTAButton disabled variant="text" title={t.cvProximamente}>
              {t.descargarCv}
            </CTAButton>
          )}
          <CTAButton href={profile.links.github} external variant="text">
            GitHub ↗
          </CTAButton>
          {profile.links.linkedin && (
            <CTAButton href={profile.links.linkedin} external variant="text">
              LinkedIn ↗
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  );
}
