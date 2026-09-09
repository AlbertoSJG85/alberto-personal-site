import { useLocale, type Locale } from "@/components/LanguageProvider";

/**
 * Bloque de "prueba rápida" bajo el hero. Cubre a la vez el ítem
 * "Capacidades" del índice de arquitectura: no existe una sección
 * adicional de capacidades duplicando este contenido.
 */

export interface Capability {
  title: string;
  description: string;
}

export const capabilitiesByLocale: Record<Locale, Capability[]> = {
  es: [
    { title: "Full-Stack", description: "Frontend + backend + datos" },
    { title: "Integraciones", description: "APIs · webhooks · OAuth" },
    { title: "IA aplicada", description: "Agentes · LLMs · workflows" },
    { title: "Producción", description: "Docker · Linux · backups · operación" },
  ],
  en: [
    { title: "Full-Stack", description: "Frontend + backend + data" },
    { title: "Integrations", description: "APIs · webhooks · OAuth" },
    { title: "Applied AI", description: "Agents · LLMs · workflows" },
    { title: "Production", description: "Docker · Linux · backups · operations" },
  ],
};

/** Devuelve `capabilitiesByLocale` en el idioma activo. Solo usable en cliente. */
export function useCapabilities(): Capability[] {
  const { locale } = useLocale();
  return capabilitiesByLocale[locale];
}
