"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "es" | "en";

const STORAGE_KEY = "asjg-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Selector de idioma de toda la landing. No hay rutas por idioma (/en, /es):
 * es un cambio en cliente, sin recarga, con la preferencia guardada en
 * localStorage para que se recuerde en la próxima visita. Por defecto,
 * español — es la web de Alberto, escrita primero en su idioma; el HTML que
 * sirve el servidor siempre es en español (metadata, `<html lang>` inicial),
 * y el cambio a inglés ocurre ya en el navegador.
 *
 * También mantiene `<html lang>` sincronizado con el idioma activo tras el
 * primer pintado, para que quede correcto de cara a lectores de pantalla y
 * al propio navegador (traductores automáticos, corrector ortográfico...).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  // El servidor siempre renderiza en español (no conoce la preferencia del
  // visitante), así que el primer render en cliente tiene que arrancar
  // igual — en español — para que la hidratación no choque con el HTML del
  // servidor. Leer localStorage aquí, ya en un efecto (después de
  // hidratar), es justo lo que evita ese desajuste: no es el caso general
  // que la regla de lint intenta prevenir, es la forma correcta de
  // sincronizar con algo que solo existe en el navegador.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "es" || stored === "en") setLocaleState(stored);
    } catch {
      // localStorage puede fallar (modo privado, permisos del navegador);
      // nos quedamos con el español por defecto sin romper nada.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // El cambio de idioma en pantalla sigue funcionando aunque no se
      // pueda persistir la preferencia.
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLocale debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}
