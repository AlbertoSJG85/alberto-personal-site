/**
 * Stack técnico agrupado. Verbatim de la sección 18 del documento maestro.
 * Sin barras de nivel, porcentajes, estrellas ni "expert": solo listado
 * agrupado por área.
 */

export interface StackGroup {
  id: string;
  title: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "core",
    title: "Core",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Python",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Docker",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    items: [
      "OpenAI / ChatGPT",
      "Anthropic / Claude",
      "Google Gemini",
      "LLMs",
      "agentes",
      "tool use",
      "structured prompting",
      "agentic workflows",
      "n8n",
      "Playwright",
      "FFmpeg",
    ],
  },
  {
    id: "apis-integrations",
    title: "APIs & Integrations",
    items: ["REST APIs", "JSON", "webhooks", "OAuth 2.0", "Meta APIs"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    items: [
      "Linux",
      "VPS",
      "Docker",
      "PostgreSQL",
      "Coolify",
      "SSH",
      "cron",
      "backups",
      "Backblaze B2",
      "SHA-256 validation",
      "health checks",
      "logs",
      "rollback",
      "Git",
      "GitHub",
      "CI / testing",
    ],
  },
];
