import { useLocale, type Locale } from "@/components/LanguageProvider";

/**
 * Datos de identidad y contacto de Alberto. El copy en español es verbatim
 * (o traducción directa de estructura) del documento maestro
 * `LANDING_PERSONAL_ALBERTO_ESPECIFICACION_CLAUDE.md`. No editar sin volver
 * a comprobar ese documento — es la fuente de verdad para el español.
 *
 * Se separa en dos partes:
 *  - `profile`: identidad compartida entre idiomas (nombre, enlaces, fotos).
 *    No se traduce: un nombre, un email o una URL son los mismos en
 *    cualquier idioma.
 *  - `profileText` / `useProfileText()`: los campos que sí cambian con el
 *    idioma (titulares, descripciones). `useProfileText()` devuelve el
 *    bloque del idioma activo — es lo que deben usar los componentes.
 *
 * Se retiraron del original (`workflowIntro`, `careerGoalTitle`,
 * `careerGoalParagraphs`, `careerGoalRoles`, `ctaFinalTitle`, `ctaFinalCopy`,
 * `nexos`) los campos que ningún componente llegó a renderizar: mantenerlos
 * solo habría significado traducir contenido muerto.
 */

export interface LanguageLevel {
  lang: string;
  level: string;
}

export const profile = {
  // `fullName` es el nombre legal completo y solo se usa en el JSON-LD.
  // En la página se muestra siempre `displayName`. Ninguno de los dos
  // cambia con el idioma.
  fullName: "Alberto Sebastián Jiménez García",
  displayName: "Alberto S. Jiménez García",

  links: {
    github: "https://github.com/AlbertoSJG85",
    nexos: "https://nexostudios.digital/",
    rentos: "https://rentos.nexostudios.digital/",
    email: "mailto:albertosjg@gmail.com",
    emailDisplay: "albertosjg@gmail.com",
    // No existe una URL pública de LinkedIn confirmada en ningún lugar del
    // entorno local. Se deja en null a propósito: los componentes que
    // consumen este dato deben omitir el enlace de LinkedIn mientras sea
    // null, en vez de mostrar un href="#" o un botón roto. En cuanto Alberto
    // confirme la URL real, basta con rellenar este valor para que el
    // enlace aparezca en Header, Hero, Contact, Footer y JSON-LD.
    linkedin: null as string | null,
  },

  /*
   * Retrato de Alberto. Se muestra siempre en blanco y negro (la clase `bw`
   * aplica el filtro), da igual que el archivo original sea en color.
   * Para activarlo: copiar la foto a `public/alberto.jpg` (o .png/.webp) y
   * poner aquí esa ruta, p. ej. "/alberto.jpg". Mientras sea null, el hero
   * muestra un marco diseñado en su lugar; nunca una foto de stock ni
   * generada.
   */
  photoUrl: "/alberto-hero.png" as string | null,
  photoSecondaryUrl: "/alberto-retrato.png" as string | null,

  // No existe todavía el PDF definitivo del CV en el entorno local. Se deja
  // en null a propósito: el CTA "Descargar CV" debe seguir siendo visible
  // (así lo pide el documento maestro) pero en estado deshabilitado hasta
  // que exista el archivo. Ruta reservada para cuando Alberto añada el PDF:
  // `public/Alberto_Sebastian_Jimenez_Garcia_CV.pdf`.
  cvUrl: null as string | null,
} as const;

export interface ProfileText {
  location: string;
  eyebrow: string;
  headline: string;
  shortDescription: string;
  secondSentence: string;
  heroText: string;
  heroSecondLine: string;
  /** Titular de la sección "Sobre mí". El texto narrativo largo de "Mi
   * historia" vive aparte, en `data/story.ts`. */
  storyTitle: string;
  photoAlt: string;
  languages: LanguageLevel[];
}

export const profileText: Record<Locale, ProfileText> = {
  es: {
    location: "Tenerife, España",
    eyebrow: "Tenerife, España · Open to remote opportunities",
    // Términos de rol ya en inglés en el propio mercado hispanohablante:
    // traducirlos sonaría forzado, así que se mantienen igual en los dos
    // idiomas.
    headline: "Applied AI · Full-Stack · Automation · Product Engineering",
    shortDescription:
      "Constructor de productos digitales y automatizaciones para problemas reales. Trabajo de extremo a extremo entre producto, IA aplicada, frontend, backend, integraciones e infraestructura.",
    secondSentence:
      "He convertido necesidades propias en herramientas que hoy también usan otras personas.",
    heroText:
      "Construyo productos digitales y automatizaciones de extremo a extremo para resolver problemas reales: desde la idea y la arquitectura hasta las integraciones, el despliegue y la operación.",
    heroSecondLine:
      "Mi fortaleza no viene de una trayectoria corporativa convencional, sino de haber tenido que aprender cada capa necesaria para hacer que mis propios sistemas funcionen de verdad.",
    storyTitle: "Así es como trabajo",
    photoAlt: "Retrato de Alberto Sebastián Jiménez García",
    languages: [
      { lang: "Español", level: "Nativo" },
      { lang: "Inglés", level: "B1" },
    ],
  },
  en: {
    location: "Tenerife, Spain",
    eyebrow: "Tenerife, Spain · Open to remote opportunities",
    headline: "Applied AI · Full-Stack · Automation · Product Engineering",
    shortDescription:
      "I build digital products and automations for real problems. I work end to end across product, applied AI, frontend, backend, integrations and infrastructure.",
    secondSentence:
      "I've turned my own needs into tools that other people now use too.",
    heroText:
      "I build digital products and end-to-end automations to solve real problems: from the idea and the architecture through integrations, deployment and operation.",
    heroSecondLine:
      "My strength doesn't come from a conventional corporate track, but from having had to learn every layer needed to make my own systems actually work.",
    storyTitle: "This is how I work",
    photoAlt: "Portrait of Alberto Sebastián Jiménez García",
    languages: [
      { lang: "Spanish", level: "Native" },
      { lang: "English", level: "B1" },
    ],
  },
};

/** Devuelve `profileText` en el idioma activo. Solo usable en cliente. */
export function useProfileText(): ProfileText {
  const { locale } = useLocale();
  return profileText[locale];
}

export type Profile = typeof profile;
