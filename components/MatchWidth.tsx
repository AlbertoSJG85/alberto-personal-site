"use client";

import { useEffect, useState, type ReactNode, type RefObject } from "react";

/**
 * Iguala el ancho máximo de sus hijos al ancho realmente renderizado de un
 * elemento de referencia (aquí, el nombre en el hero). Así la línea de rol
 * y la descripción siempre terminan justo donde termina "García" —en
 * cualquier tamaño de pantalla y con el tamaño de letra fluido del
 * titular—, sin tener que adivinar anchos por breakpoint.
 *
 * Mide con ResizeObserver, así que se recalcula solo si el titular cambia
 * de ancho al redimensionar. Antes de que el JS corra (o si falla), los
 * hijos no llevan restricción de ancho: se ven con su comportamiento
 * normal, nunca rotos ni ocultos.
 */
export default function MatchWidth({
  reference,
  children,
  className = "",
}: {
  reference: RefObject<HTMLElement | null>;
  children: ReactNode;
  className?: string;
}) {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const node = reference.current;
    if (!node) return;

    const update = () => setWidth(node.getBoundingClientRect().width);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [reference]);

  return (
    <div className={className} style={width ? { maxWidth: width } : undefined}>
      {children}
    </div>
  );
}
