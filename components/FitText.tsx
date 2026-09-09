"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";

interface FitTextProps {
  text: string;
  /** Elemento cuyo ancho renderizado marca el ancho a ocupar exactamente. */
  containerRef: RefObject<HTMLElement | null>;
  /** Tamaño de referencia con el que se mide el ancho natural del texto. */
  baseFontSizePx: number;
  minFontSizePx?: number;
  className?: string;
}

/**
 * Encaja `text` en una única línea que ocupa exactamente el ancho de
 * `containerRef` (en el hero, el mismo elemento al que ya se igualó el
 * ancho vía `MatchWidth`) — ni más corta ni más larga: el texto siempre
 * termina justo donde termina el contenedor de referencia.
 *
 * A diferencia de un `max-width` con wrap normal —que es lo que hacía que
 * "Engineering" cayera a una segunda línea—, aquí se ajusta el tamaño de
 * letra en la proporción exacta que hace falta, tanto para encoger (si el
 * texto no cabe) como para crecer (si sobra espacio): el tamaño de
 * referencia (`baseFontSizePx`) es solo el punto de partida para medir el
 * ancho natural, no un techo. Solo `minFontSizePx` actúa de límite, para
 * que en pantallas muy estrechas no se vuelva ilegible.
 *
 * Mide con `useLayoutEffect` (antes de pintar, sin parpadeo) y un
 * ResizeObserver sobre el contenedor de referencia, así que se recalcula
 * solo si su ancho cambia. Sin JS, el texto se ve al tamaño de referencia y
 * en una sola línea sin envolver: puede desbordar visualmente, pero nunca
 * queda oculto ni roto.
 */
export default function FitText({
  text,
  containerRef,
  baseFontSizePx,
  minFontSizePx = 13,
  className = "",
}: FitTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(baseFontSizePx);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const node = textRef.current;
    if (!container || !node) return;

    const fit = () => {
      // Mide el ancho natural del texto al tamaño de referencia (mutación
      // directa, solo para medir) y escala a partir de ahí.
      node.style.fontSize = `${baseFontSizePx}px`;
      const naturalWidth = node.getBoundingClientRect().width;
      const available = container.getBoundingClientRect().width;
      if (naturalWidth === 0 || available === 0) return;

      const scale = available / naturalWidth;
      const next = Math.max(minFontSizePx, baseFontSizePx * scale);
      // Aplicar ya mismo, imperativamente: si esta llamada recalcula el
      // mismo valor que la anterior (típico — nada cambió de verdad),
      // `setFontSize(next)` no provoca un nuevo render porque React ve el
      // mismo estado. Sin esta línea, el nodo se quedaba con el tamaño de
      // medición (`baseFontSizePx`) que la propia función acaba de fijar
      // dos líneas más arriba, porque nada volvía a corregirlo.
      node.style.fontSize = `${next}px`;
      setFontSize(next);
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(container);

    // Las fuentes (next/font, `display: swap`) cargan de forma asíncrona.
    // Si `fit()` mide antes de que la tipografía real termine de cargar,
    // el cálculo se basa en las métricas de la fuente de reserva — y el
    // ResizeObserver del contenedor puede no detectar el desajuste
    // posterior, porque next/font ajusta esa reserva precisamente para que
    // el contenedor casi no cambie de tamaño al intercambiar la fuente.
    // Sin este recálculo explícito, el resultado dependía de qué fuente
    // (la del nombre o la del rol) terminaba de cargar antes: unas veces se
    // quedaba corto, otras se pasaba. `document.fonts.ready` resuelve
    // cuando todas las fuentes de la página ya están listas, así que una
    // medición ahí siempre es la definitiva.
    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) fit();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [containerRef, baseFontSizePx, minFontSizePx, text]);

  return (
    <span ref={textRef} className={className} style={{ fontSize, whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}
