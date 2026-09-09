"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

interface DisclosureProps {
  /** Ancla de la sección: también sirve para abrirla desde un enlace. */
  sectionId: string;
  index: string;
  title: string;
  children: ReactNode;
}

/**
 * Sección plegable. Cerrada ocupa una sola fila con su índice y su título;
 * al pulsar despliega el contenido.
 *
 * Detalle importante: si se llega a la sección desde un enlace interno
 * (#proyectos, por ejemplo), se abre sola. De lo contrario el CTA de la
 * portada llevaría a un bloque cerrado y parecería que no ha pasado nada.
 *
 * Accesibilidad: botón con `aria-expanded`/`aria-controls`, y el panel se
 * marca `inert` mientras está cerrado para que no reciba foco ni lo lea un
 * lector de pantalla, aunque siga en el DOM para poder animar la apertura.
 */
export default function Disclosure({ sectionId, index, title, children }: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { locale } = useLocale();
  const t = uiStrings[locale].disclosure;

  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${sectionId}`) setOpen(true);
    };

    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, [sectionId]);

  return (
    <section id={sectionId} className="border-b border-rule bg-bg scroll-mt-20">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <h2>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group flex w-full items-center justify-between gap-6 py-10 text-left sm:py-14"
          >
            <span className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="mono index text-accent">{index}</span>
              <span className="display text-[clamp(2rem,6.5vw,5rem)] text-fg transition-colors duration-200 group-hover:text-accent">
                {title}
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-4">
              <span className="mono hidden text-fg-3 sm:inline">{open ? t.close : t.open}</span>
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-rule-strong text-fg transition-colors duration-200 group-hover:border-accent group-hover:text-accent sm:h-14 sm:w-14"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 3v14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`origin-center transition-transform duration-300 ease-out ${
                      open ? "scale-y-0" : ""
                    }`}
                  />
                  <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </span>
          </button>
        </h2>

        <div id={panelId} className="disclosure" data-open={open} inert={!open}>
          <div>
            <div className="border-t border-rule pb-16 pt-10 sm:pb-20">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
