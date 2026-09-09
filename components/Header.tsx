"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { uiStrings } from "@/data/ui-strings";
import { useLocale, type Locale } from "./LanguageProvider";

/**
 * Selector ES/EN con banderas. Sin rutas por idioma: cambia el contenido
 * en cliente al instante (ver `LanguageProvider`). Cuadrado, no en píldora
 * redonda — sigue el mismo lenguaje visual angular que el resto del sitio
 * (marcador del logo, viñetas de "Mi historia"...).
 *
 * Las banderas son SVG propios en `public/flags/` (`<img>`, no emoji): el
 * emoji de bandera depende de que el sistema operativo tenga esa fuente de
 * color instalada, y en Windows con Chrome no siempre está — ahí no se veía
 * ninguna bandera. Un SVG se ve igual en cualquier sistema.
 */
function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const options: { value: Locale; flag: string; label: string }[] = [
    { value: "es", flag: "/flags/es.svg", label: "ES" },
    { value: "en", flag: "/flags/gb.svg", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="flex items-center border border-rule-strong"
    >
      {options.map((option, i) => {
        const active = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-pressed={active}
            className={`flex items-center gap-1 px-1.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] transition-colors duration-200 sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-xs sm:tracking-[0.08em] ${
              i === 1 ? "border-l border-rule-strong" : ""
            } ${active ? "bg-accent text-bg" : "text-fg-2 hover:text-fg"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- icono
                SVG estático: no necesita el pipeline de optimización de
                next/image (pensado para fotos), y next/image desactiva SVG
                por defecto por seguridad. Más pequeño en móvil (14x10) que
                en el resto de tamaños (20x14) — el control entero se
                encoge ahí para no competir con el logo. */}
            <img src={option.flag} alt="" className="block h-[10px] w-[14px] sm:h-[14px] sm:w-[20px]" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Cabecera fija y transparente sobre la portada: la foto a sangre no debe
 * quedar cortada por una barra opaca. En cuanto se hace scroll aparece el
 * fondo y la regla inferior.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale } = useLocale();
  const t = uiStrings[locale].nav;

  const navLinks = [
    { href: "#sobre-mi", label: t.sobreMi },
    { href: "#historia", label: t.historia },
    { href: "#stack", label: t.stack },
    { href: "#proyectos", label: t.proyectos },
    { href: "#contacto", label: t.contacto },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-rule bg-bg/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-7 sm:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="h-3 w-3 bg-accent" aria-hidden="true" />
          <span className="font-mono text-base font-semibold uppercase tracking-[0.1em] text-fg">
            ASJG
          </span>
        </a>

        {/*
          Los enlaces de navegación no usan la clase `.mono` compartida
          (0.6875rem): con la barra más alta se veían pequeños en
          comparación. Llevan su propio tamaño, igual que los CTA del hero.
        */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm uppercase tracking-[0.08em] link-underline text-fg-2 transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-[0.08em] link-underline text-fg-2 transition-colors hover:text-fg"
          >
            GitHub ↗
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <button
            type="button"
            className="-mr-2 flex items-center justify-center p-2 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open
                ? locale === "es"
                  ? "Cerrar menú"
                  : "Close menu"
                : locale === "es"
                  ? "Abrir menú"
                  : "Open menu"
            }
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="border-t border-rule bg-bg px-6 py-2 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono block border-b border-rule py-4 text-sm uppercase tracking-[0.08em] text-fg"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="font-mono block py-4 text-sm uppercase tracking-[0.08em] text-fg"
          >
            GitHub ↗
          </a>
        </nav>
      )}
    </header>
  );
}
