"use client";

import { profile, useProfileText } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  const text = useProfileText();

  return (
    <footer className="border-t border-rule bg-bg py-8">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="mono text-fg-3">
          © {year} {profile.displayName} · {text.location}
        </p>
        <p className="mono text-fg-3">
          {text.languages.map((l) => `${l.lang} ${l.level}`).join("  ·  ")}
        </p>
      </div>
    </footer>
  );
}
