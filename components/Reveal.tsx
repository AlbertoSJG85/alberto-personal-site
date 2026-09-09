"use client";

import { useEffect, useRef, type ReactNode } from "react";

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
  );

  return sharedObserver;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveal-on-scroll discreto y barato: un único IntersectionObserver
 * compartido entre todas las instancias, y toda la animación vive en CSS
 * (globals.css). El estado oculto (`reveal-pending`) solo se añade aquí,
 * en cliente, tras confirmar que hay JS y que el usuario no pide menos
 * movimiento: si algo falla, el contenido se queda visible por defecto
 * (nunca invisible de forma permanente). Un timeout de seguridad fuerza la
 * revelación si el observer nunca llega a disparar.
 */
export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    node.classList.add("reveal-pending");

    const observer = getSharedObserver();
    observer.observe(node);

    const safetyTimeout = window.setTimeout(() => {
      node.classList.add("is-visible");
    }, 4000);

    return () => {
      observer.unobserve(node);
      window.clearTimeout(safetyTimeout);
    };
  }, []);

  const Tag = as as "div";

  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
