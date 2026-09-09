type Variant = "solid" | "text";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface LinkCTAProps extends BaseProps {
  href: string;
  disabled?: false;
  external?: boolean;
}

interface DisabledCTAProps extends BaseProps {
  href?: undefined;
  disabled: true;
  title?: string;
}

export type CTAButtonProps = LinkCTAProps | DisabledCTAProps;

/*
 * No se usa la clase `.mono` compartida (0.6875rem, la de índices y
 * etiquetas de sección): en el hero, junto al nombre a gran tamaño, esos
 * botones quedaban demasiado pequeños. Llevan su propio tamaño —mismo
 * espíritu mono/uppercase— desacoplado del resto de etiquetas del sitio
 * para no afectarlas al cambiar esto.
 *
 * Más compactos en móvil (los tres CTA del hero comparten fila y a tamaño
 * de escritorio no cabían en el ancho de un teléfono, forzando el salto de
 * línea) y con su tamaño completo desde `sm:`.
 */
const base =
  "inline-flex items-center justify-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-[0.06em] transition-colors duration-200 ease-out focus-visible:outline-none sm:gap-2 sm:text-sm sm:tracking-[0.1em]";

/*
 * El botón sólido usa el color de señal con texto casi negro encima (ratio
 * ~5:1). No se usa texto blanco sobre el rojo: no llegaría a AA.
 */
const variants: Record<Variant, string> = {
  solid: "bg-accent px-3.5 py-2.5 font-semibold text-bg hover:bg-fg sm:px-8 sm:py-4",
  text: "link-underline font-medium text-fg",
};

export default function CTAButton(props: CTAButtonProps) {
  const { variant = "solid", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (props.disabled) {
    return (
      <span
        className={`${classes} cursor-not-allowed opacity-40`}
        aria-disabled="true"
        title={props.title ?? "No disponible todavía"}
        tabIndex={-1}
      >
        {children}
      </span>
    );
  }

  const { href, external } = props;

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
