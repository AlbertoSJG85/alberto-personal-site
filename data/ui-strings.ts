import type { Locale } from "@/components/LanguageProvider";

/**
 * Textos de interfaz que no son contenido propio de Alberto (nav, botones,
 * etiquetas de sección, microcopy): todo lo demás vive junto a sus datos
 * (`data/profile.ts`, `data/story.ts`, `data/projects.ts`,
 * `data/capabilities.ts`), cada uno con su propio `Record<Locale, ...>`.
 */
export interface UiStrings {
  nav: {
    sobreMi: string;
    historia: string;
    stack: string;
    proyectos: string;
    contacto: string;
  };
  hero: {
    verProyectos: string;
    descargarCv: string;
    cvProximamente: string;
  };
  disclosure: {
    open: string;
    close: string;
  };
  about: {
    sectionLabel: string;
  };
  story: {
    sectionLabel: string;
    title: string;
  };
  stack: {
    sectionLabel: string;
    title: string;
  };
  projects: {
    sectionLabel: string;
    title: string;
    enDesarrollo: string;
    verProducto: string;
    githubAriaSuffix: string;
    tambienEnElEcosistema: string;
  };
  capabilities: {
    ariaLabel: string;
  };
  contact: {
    sectionLabel: string;
    title: string;
    descargarCv: string;
    cvProximamente: string;
  };
}

export const uiStrings: Record<Locale, UiStrings> = {
  es: {
    nav: {
      sobreMi: "Sobre mí",
      historia: "Mi historia",
      stack: "Stack",
      proyectos: "Proyectos",
      contacto: "Contacto",
    },
    hero: {
      verProyectos: "Ver proyectos",
      descargarCv: "Descargar CV",
      cvProximamente: "CV disponible próximamente",
    },
    disclosure: {
      open: "Desplegar",
      close: "Cerrar",
    },
    about: {
      sectionLabel: "Sobre mí",
    },
    story: {
      sectionLabel: "Mi historia",
      title: "Mi historia",
    },
    stack: {
      sectionLabel: "Stack",
      title: "Con qué construyo",
    },
    projects: {
      sectionLabel: "Proyectos",
      title: "Lo que he construido",
      enDesarrollo: "En desarrollo",
      verProducto: "Ver producto",
      githubAriaSuffix: "en GitHub",
      tambienEnElEcosistema: "También en el ecosistema",
    },
    capabilities: {
      ariaLabel: "Capacidades",
    },
    contact: {
      sectionLabel: "Contacto",
      title: "Hablemos",
      descargarCv: "Descargar CV",
      cvProximamente: "CV disponible próximamente",
    },
  },
  en: {
    nav: {
      sobreMi: "About",
      historia: "My story",
      stack: "Stack",
      proyectos: "Projects",
      contacto: "Contact",
    },
    hero: {
      verProyectos: "View projects",
      descargarCv: "Download CV",
      cvProximamente: "CV available soon",
    },
    disclosure: {
      open: "Expand",
      close: "Close",
    },
    about: {
      sectionLabel: "About me",
    },
    story: {
      sectionLabel: "My story",
      title: "My story",
    },
    stack: {
      sectionLabel: "Stack",
      title: "What I build with",
    },
    projects: {
      sectionLabel: "Projects",
      title: "What I've built",
      enDesarrollo: "In progress",
      verProducto: "View product",
      githubAriaSuffix: "on GitHub",
      tambienEnElEcosistema: "Also in the ecosystem",
    },
    capabilities: {
      ariaLabel: "Capabilities",
    },
    contact: {
      sectionLabel: "Contact",
      title: "Let's talk",
      descargarCv: "Download CV",
      cvProximamente: "CV available soon",
    },
  },
};
