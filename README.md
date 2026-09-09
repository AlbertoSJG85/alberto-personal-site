# Landing personal — Alberto Sebastián Jiménez García

Landing personal corta (one-page) orientada a candidaturas técnicas: Applied AI,
AI Automation, Full-Stack, Product Engineering y Backend/APIs. Next.js (App
Router) + React + TypeScript + Tailwind CSS v4. Sin backend, sin base de datos,
sin autenticación.

Contenido y datos: `LANDING_PERSONAL_ALBERTO_ESPECIFICACION_CLAUDE.md` es la
fuente de verdad. La web es deliberadamente breve: cuenta lo justo y enlaza a
GitHub, al producto y al CV para quien quiera profundizar.

## Ejecutar en local

```bash
npm install
npm run dev     # http://localhost:3000
```

Producción: `npm run build && npm run start`.

## Estructura de la página

1. **Hero** — nombre, rol, una frase y retrato en B/N.
2. **Capacidades** — cuatro líneas (Full-Stack, Integraciones, IA aplicada, Producción).
3. **Proyectos** — lista compacta: una fila por proyecto con una línea de
   contexto, stack resumido y enlace externo. Los secundarios (ClinicOS,
   IngresOS, NexOS Pay, Wave, NauticOS) se mencionan en una sola línea.
4. **Sobre mí** — el gancho y el cierre de la historia, con la segunda foto.
5. **Stack** — cuatro filas agrupadas por área.
6. **Qué busco / contacto** — email a gran escala y enlaces.

## Dirección visual

Monocromo oscuro cinematográfico: fondo casi negro (`#080908`), texto hueso
(`#f2f1ee`), retratos en blanco y negro (filtro `bw`, se aplica aunque el
original venga en color) fundidos con el fondo mediante un degradado
superpuesto (`photo-fade`). Tipografía: **Instrument Serif** en titulares y
**Manrope** en cuerpo y micro-etiquetas, vía `next/font/google`.

## Fotos

- `public/alberto-hero.png` — retrato del hero.
- `public/alberto-retrato.png` — retrato de la sección "Sobre mí".

Se referencian desde `data/profile.ts` (`photoUrl` y `photoSecondaryUrl`). Los
archivos originales `ChatGPT Image *.png` siguen en `public/` como copia; si no
se van a usar, se pueden borrar para aligerar el despliegue.

## Decisiones y pendientes reales

- **CV**: no existe todavía el PDF. `cvUrl: null` en `data/profile.ts` y el CTA
  se muestra deshabilitado (`aria-disabled`, fuera del orden de tabulación).
  Para activarlo: copiar el PDF a
  `public/Alberto_Sebastian_Jimenez_Garcia_CV.pdf` y poner esa ruta en `cvUrl`.
- **LinkedIn**: no hay URL pública confirmada. `links.linkedin: null` y el
  enlace se omite en toda la web y en el JSON-LD. Para activarlo: rellenar ese
  valor.
- **Dominio**: la landing vive solo en local; no se ha tocado DNS ni desplegado.
