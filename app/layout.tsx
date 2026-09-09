import type { Metadata } from "next";
import { Chakra_Petch, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, profileText } from "@/data/profile";
import { LanguageProvider } from "@/components/LanguageProvider";

/*
 * Tipografía en dos capas, no una:
 *  - Chakra Petch para el texto de cuerpo (párrafos, chips, botones): a
 *    Alberto le gusta ahí, mantiene el aire técnico sin ser gigante.
 *  - Rajdhani solo para los titulares grandes (.display, h1-h3): igual de
 *    técnica, formas cuadradas de raíz "dashboard/HUD", pero sin los
 *    cortes en punta de Chakra Petch, que a tamaño grande se leían
 *    demasiado agresivos.
 * JetBrains Mono sigue aparte para etiquetas, índices y metadatos.
 *
 * Descartadas por el camino: la pareja serif editorial (tono de revista de
 * moda), Archivo en peso 900 con mayúsculas (mayúsculas destrozaban los
 * nombres de producto: PILOTOS por PilotOS), Space Grotesk, Geist (la
 * favorita hasta antes de pedir "más tecnológico" — apuesta segura si esta
 * combinación tampoco convence), Bricolage Grotesque, Sora (demasiado
 * redonda) y Chakra Petch como titular (demasiado picuda a tamaño grande;
 * se conserva solo para el cuerpo del texto).
 */
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Alberto S. Jiménez García | Applied AI · Full-Stack · Automation";
const description =
  "Product & AI Engineer en Tenerife. Construyo productos, automatizaciones, agentes e integraciones end-to-end con TypeScript, Node.js, Python, APIs, IA y Docker.";

// Dominio confirmado con Alberto (2026-09-09): founder.nexostudios.digital,
// subdominio de NexOS, DNS ya apuntado al VPS. `NEXT_PUBLIC_SITE_URL` sigue
// existiendo como variable de override — útil para un despliegue de
// vista previa en Coolify con otra URL — pero el valor por defecto ya es
// el dominio real, no localhost: `metadataBase` debe ser siempre la URL
// canónica de producción, la vea quien la vea.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://founder.nexostudios.digital";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const sameAs = [profile.links.github, profile.links.nexos, profile.links.linkedin].filter(
  (value): value is string => Boolean(value)
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  // JSON-LD se genera en servidor, sin conocer la preferencia de idioma del
  // visitante: se sirve siempre en español, igual que el resto del HTML
  // inicial (metadata, `<html lang>`). El selector de idioma cambia lo que
  // se ve en pantalla, no lo que el servidor manda antes de hidratar.
  jobTitle: profileText.es.headline,
  email: profile.links.emailDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tenerife",
    addressCountry: "ES",
  },
  sameAs,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${chakraPetch.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
