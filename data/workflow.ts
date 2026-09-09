/** Sección 17, "Cómo trabajo". */

export const workflowSteps: string[] = [
  "Problema",
  "Producto",
  "Arquitectura",
  "Desarrollo",
  "Integraciones",
  "Testing",
  "Despliegue",
  "Operación",
  "Mejora",
];

export interface WorkflowPrinciple {
  title: string;
  description: string;
}

export const workflowPrinciples: WorkflowPrinciple[] = [
  {
    title: "Construir antes que teorizar",
    description: "Aprendo especialmente bien resolviendo problemas concretos.",
  },
  {
    title: "Automatizar con propósito",
    description:
      "La automatización tiene que eliminar trabajo real, no añadir otra herramienta que mantener.",
  },
  {
    title: "IA dentro del sistema",
    description:
      "Prefiero integrar IA en procesos y productos antes que construir demos aisladas.",
  },
  {
    title: "Producción importa",
    description:
      "Logs, backups, health checks, rollback y recuperación forman parte del producto.",
  },
];
