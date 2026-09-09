import { ImageResponse } from "next/og";
import { profile, profileText } from "@/data/profile";

// La imagen OG se genera en servidor, sin conocer la preferencia de idioma
// del visitante que comparte el enlace: se sirve siempre en español, igual
// que el resto del HTML inicial.
const text = profileText.es;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#080908",
          color: "#f2f1ee",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a3a29e",
            fontFamily: "sans-serif",
          }}
        >
          {text.eyebrow}
        </span>

        <span style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4, fontWeight: 800, display: "flex" }}>
          {profile.displayName}
        </span>

        <span
          style={{
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#a3a29e",
            borderTop: "1px solid #232326",
            paddingTop: 24,
            fontFamily: "sans-serif",
          }}
        >
          {text.headline}
        </span>
      </div>
    ),
    size
  );
}
