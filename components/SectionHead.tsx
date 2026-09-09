import Reveal from "./Reveal";

/**
 * Cabecera de sección compartida: índice mono, título en mayúsculas y regla
 * en color de señal. Se usa en todas las secciones para que el ritmo de la
 * página sea el mismo de arriba abajo.
 */
export default function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 border-t border-rule pt-4">
        <span className="mono index text-accent">{index}</span>
        <span className="mono text-fg-3">{label}</span>
      </div>
    </Reveal>
  );
}
