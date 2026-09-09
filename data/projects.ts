import { useLocale, type Locale } from "@/components/LanguageProvider";

/**
 * Proyectos de Alberto. Contenido verbatim de las secciones 12-16 y 19 del
 * documento maestro `LANDING_PERSONAL_ALBERTO_ESPECIFICACION_CLAUDE.md`.
 *
 * No inventar capacidades, stack, enlaces ni estado. `tier` fija la
 * jerarquía visual:
 *   1 = PilotOS, GlorIA (mayor peso)
 *   2 = RentOS, ClinicOS, NexOS Meta + Wave, Hermes
 *   3 = IngresOS, NexOS Pay, NauticOS (compactos, "También en el ecosistema")
 *
 * Dos decisiones tomadas con Alberto sobre la jerarquía de la sección 52 del
 * documento maestro:
 *   - GlorIA se separa de NexOS Meta y va sola: es el agente central y la
 *     identidad que atraviesa todo el ecosistema, no una pieza de un
 *     producto concreto.
 *   - NexOS Meta y NexOS Wave se presentan como una sola ficha: comparten
 *     la misma capa de integraciones (Meta APIs, OAuth, tokens, webhooks).
 *
 * `visual.kind`:
 *   - "diagram": no hay captura real disponible, se representa con un
 *     diagrama esquemático simple (componente DiagramFlow), nunca un mockup
 *     que simule una interfaz que no existe.
 *   - "placeholder": composición tipográfica neutra (nombre + descriptor)
 *     mientras no exista una captura real. Cuando exista, añadirla en
 *     `public/projects/<slug>.png` y cambiar `visual.kind` a "screenshot"
 *     (no implementado todavía porque no hay ninguna captura real que usar).
 */

export type ProjectTier = 1 | 2 | 3;

export interface DiagramStep {
  label: string;
  sublabel?: string;
}

export interface Project {
  slug: string;
  name: string;
  descriptor: string;
  tier: ProjectTier;
  status?: "en-desarrollo";
  /** Una sola línea, la que se muestra en la lista compacta de la landing. */
  summary?: string;
  story?: string;
  capabilities: string[];
  stack: string[];
  /**
   * Landing pública del producto. Solo la tienen los productos que se
   * venden como tales: RentOS, PilotOS y ClinicOS. GlorIA, NexOS Meta +
   * Wave y Hermes son módulos internos del ecosistema y no llevan landing
   * propia — su ficha no es clicable, y quien quiera ver más va al repo.
   * Patrón del subdominio: <producto en minúsculas>.nexostudios.digital
   */
  landingUrl?: string;
  /** Repositorio público, cuando lo hay. */
  repoUrl?: string;
  visual:
    | { kind: "diagram"; steps: DiagramStep[]; note?: string }
    | { kind: "placeholder" };
  /** Decisión técnica destacable, opcional, mostrada de forma secundaria. */
  technicalNote?: string;
}

export const projects: Project[] = [
  // ---------------------------------------------------------------- Tier 1
  {
    slug: "pilotos",
    name: "PilotOS",
    descriptor: "Sistema de gestión operativa para taxi",
    tier: 1,
    summary:
      "Nació de mi propia operativa diaria del taxi y terminó siendo útil también para compañeros que gestionan conductores asalariados. Frontend, backend, autenticación, testing y despliegue.",
    story:
      "Nació de una necesidad real de mi propia operativa diaria y terminó siendo útil también para compañeros que gestionan conductores asalariados.",
    capabilities: [
      "Operativa diaria, servicios y conductores",
      "Frontend y backend completos",
      "Autenticación y seguridad",
      "Testing, despliegue y operación",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Vitest",
      "Docker",
      "JWT",
      "cookies HttpOnly",
      "rate limiting",
      "Helmet",
      "cron",
      "CI",
    ],
    landingUrl: "https://pilotos.nexostudios.digital/",
    repoUrl: "https://github.com/AlbertoSJG85/-PilotOS",
    visual: { kind: "placeholder" },
    technicalNote:
      "Una de las decisiones fue migrar la autenticación desde localStorage a cookies HttpOnly y utilizar SameSite=Lax para equilibrar seguridad y usabilidad en accesos iniciados desde enlaces externos como WhatsApp.",
  },
  {
    slug: "gloria",
    name: "GlorIA",
    descriptor: "Agente central de IA del ecosistema",
    tier: 1,
    summary:
      "Capa conversacional conectada con procesos reales: conversación con usuarios, conocimiento de producto, automatización de flujos y leads. No pertenece a ningún producto concreto — es la identidad que atraviesa todo el ecosistema.",
    story:
      "Una capa conversacional conectada con procesos reales, no una demo de chatbot.",
    capabilities: [
      "Conversación con usuarios y conocimiento de producto",
      "Automatización de flujos y leads",
      "Integración con WhatsApp e Instagram",
      "Conexión con procesos operativos",
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "n8n", "REST APIs", "OpenAI"],
    visual: {
      kind: "diagram",
      steps: [
        { label: "Usuario" },
        { label: "GlorIA", sublabel: "conversación · conocimiento de producto" },
        { label: "n8n / procesos / leads" },
      ],
    },
  },
  // ---------------------------------------------------------------- Tier 2
  {
    slug: "rentos",
    name: "RentOS",
    descriptor: "Automatización de alojamientos vacacionales",
    tier: 2,
    summary:
      "Nació para reducir tareas manuales y repetitivas en la gestión de mis propios alojamientos vacacionales: reservas, operativa, mensajería, automatización y dashboards.",
    story:
      "Nació para reducir tareas manuales y repetitivas en la gestión de mis propios alojamientos.",
    capabilities: [
      "Reservas y operativa",
      "Mensajería y automatización",
      "Integraciones y dashboards",
    ],
    stack: ["Next.js", "n8n", "OpenAI", "PostgreSQL", "Supabase", "Docker"],
    landingUrl: "https://rentos.nexostudios.digital/",
    visual: { kind: "placeholder" },
  },
  {
    slug: "clinicos",
    name: "ClinicOS",
    descriptor: "Gestión clínica",
    tier: 2,
    status: "en-desarrollo",
    summary:
      "Vertical sanitaria trabajada en simulación segura, sobre un core tipado con clasificación determinista. No es un backend médico en producción: es el terreno donde pruebo el core del ecosistema con reglas estrictas.",
    landingUrl: "https://clinicos.nexostudios.digital/",
    capabilities: [
      "Core tipado (Node.js, TypeScript)",
      "Clasificación determinista",
      "Vertical sanitaria en simulación segura",
    ],
    stack: ["Node.js", "TypeScript"],
    visual: { kind: "placeholder" },
  },
  {
    slug: "nexos-meta-wave",
    name: "NexOS Meta + Wave",
    descriptor: "Mensajería, publicación e integraciones",
    tier: 2,
    summary:
      "La infraestructura que centraliza los eventos de WhatsApp e Instagram —webhooks, normalización, idempotencia, health checks y rollback— y la que publica y distribuye contenido en Instagram, TikTok y Google Drive con OAuth y gestión de tokens.",
    capabilities: [
      "Webhooks, normalización de eventos e idempotencia",
      "Health checks, rollback y fail-closed",
      "Publicación en Instagram, TikTok y Google Drive",
      "OAuth / tokens y migración de integraciones",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "n8n",
      "REST APIs",
      "OAuth 2.0",
      "webhooks",
      "Meta APIs",
    ],
    visual: {
      kind: "diagram",
      steps: [
        { label: "Instagram / WhatsApp / TikTok" },
        { label: "NexOS Meta", sublabel: "webhooks · OAuth · idempotencia" },
        { label: "Normalización de eventos" },
        { label: "GlorIA / n8n" },
      ],
    },
  },
  {
    slug: "hermes",
    name: "Hermes",
    // La etiqueta obligatoria "en desarrollo" se muestra como badge a partir
    // de `status`, así que no se repite aquí.
    descriptor: "Agente autónomo / asistente de ejecución",
    tier: 2,
    status: "en-desarrollo",
    summary:
      "Agente de ejecución con worker local y automatización de navegador sobre una arquitectura VPS ↔ Windows, con permisos y restricciones acotados.",
    capabilities: [
      "Automatización de navegador (Playwright)",
      "Worker local y scripts",
      "Arquitectura VPS ↔ Windows",
      "Permisos y restricciones",
    ],
    stack: ["Python", "Playwright"],
    visual: {
      kind: "diagram",
      steps: [
        { label: "VPS" },
        { label: "Gateway" },
        { label: "Windows Worker" },
        { label: "Playwright / Browser" },
      ],
      note: "En desarrollo",
    },
  },
  // ---------------------------------------------------------------- Tier 3
  {
    slug: "ingresos",
    name: "IngresOS",
    descriptor: "Automatización de documentos, ingresos y flujo financiero",
    tier: 3,
    capabilities: ["Repo privado"],
    stack: [],
    visual: { kind: "placeholder" },
  },
  {
    slug: "nexos-pay",
    name: "NexOS Pay",
    descriptor: "Acceso, suscripción, entitlement y estado de pago",
    tier: 3,
    capabilities: ["Repo privado"],
    stack: [],
    visual: { kind: "placeholder" },
  },
  {
    slug: "nauticos",
    name: "NauticOS",
    descriptor: "Proyecto/visión relacionado con náutica",
    tier: 3,
    capabilities: ["Parte personal de la historia, no un sistema productivo verificado"],
    stack: [],
    visual: { kind: "placeholder" },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === 1 || p.tier === 2);
export const otherProjects = projects.filter((p) => p.tier === 3);

/*
 * Traducción al inglés. Solo `descriptor` y `summary`: son los únicos
 * campos de texto libre que la landing llega a renderizar (`capabilities`,
 * `story`, `visual` y `technicalNote` no se usan en ningún componente hoy —
 * ver `components/Projects.tsx` — así que no hacía falta duplicarlos en dos
 * idiomas). El nombre, el stack y los enlaces son los mismos en cualquier
 * idioma.
 */
const projectTextEn: Record<string, { descriptor: string; summary?: string }> = {
  pilotos: {
    descriptor: "Operations management system for taxi drivers",
    summary:
      "Born from my own day-to-day taxi operation, and it ended up being useful for colleagues who manage salaried drivers too. Frontend, backend, authentication, testing and deployment.",
  },
  gloria: {
    descriptor: "The ecosystem's central AI agent",
    summary:
      "A conversational layer connected to real processes: talking to users, product knowledge, flow automation and leads. It doesn't belong to any single product — it's the identity that runs through the whole ecosystem.",
  },
  rentos: {
    descriptor: "Vacation rental automation",
    summary:
      "Born to cut down on manual, repetitive tasks in managing my own vacation rentals: bookings, day-to-day operations, messaging, automation and dashboards.",
  },
  clinicos: {
    descriptor: "Clinical management",
    summary:
      "A healthcare vertical worked on in a safe simulation, on top of a typed core with deterministic classification. Not a medical backend in production — it's where I stress-test the ecosystem's core against strict rules.",
  },
  "nexos-meta-wave": {
    descriptor: "Messaging, publishing and integrations",
    summary:
      "The infrastructure that centralizes WhatsApp and Instagram events — webhooks, normalization, idempotency, health checks and rollback — and the one that publishes and distributes content on Instagram, TikTok and Google Drive with OAuth and token management.",
  },
  hermes: {
    descriptor: "Autonomous agent / execution assistant",
    summary:
      "An execution agent with a local worker and browser automation on a VPS ↔ Windows architecture, with bounded permissions and restrictions.",
  },
  ingresos: {
    descriptor: "Document, income and financial-flow automation",
  },
  "nexos-pay": {
    descriptor: "Access, subscription, entitlement and payment status",
  },
  nauticos: {
    descriptor: "A project/vision related to sailing",
  },
};

export interface ProjectView extends Omit<Project, "descriptor" | "summary"> {
  descriptor: string;
  summary?: string;
}

function applyLocale(project: Project, locale: Locale): ProjectView {
  if (locale === "es") return project;
  const en = projectTextEn[project.slug];
  return en ? { ...project, ...en } : project;
}

/**
 * Proyectos con `descriptor`/`summary` en el idioma activo, ya separados
 * en principales y "también en el ecosistema". Solo usable en cliente.
 */
export function useProjects(): { featured: ProjectView[]; other: ProjectView[] } {
  const { locale } = useLocale();
  return {
    featured: featuredProjects.map((p) => applyLocale(p, locale)),
    other: otherProjects.map((p) => applyLocale(p, locale)),
  };
}
