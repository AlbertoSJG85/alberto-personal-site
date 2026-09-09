"use client";

import Reveal from "./Reveal";
import Disclosure from "./Disclosure";
import { useProjects } from "@/data/projects";
import { useLocale } from "./LanguageProvider";
import { uiStrings } from "@/data/ui-strings";

/**
 * Rejilla de fichas, no lista de artículos. La ficha entera lleva a la
 * landing del producto mediante un enlace estirado (`after:inset-0`) sobre
 * el nombre; el enlace al repositorio va aparte, por encima, para que quien
 * quiera el código lo pida explícitamente. No se anidan dos <a>.
 */
export default function Projects() {
  const { locale } = useLocale();
  const t = uiStrings[locale].projects;
  const { featured, other } = useProjects();

  return (
    <Disclosure sectionId="proyectos" index="04" title={t.title}>
      <div className="flex flex-col gap-12">
        <ul className="grid gap-px border border-rule bg-rule lg:grid-cols-2">
          {featured.map((project, i) => (
            <li key={project.slug} className="contents">
              <Reveal className="group relative h-full">
                <article className="flex h-full flex-col gap-5 bg-bg p-7 transition-colors duration-300 group-hover:bg-bg-2 sm:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <span className="mono index text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {project.status === "en-desarrollo" && (
                      <span className="mono border border-accent px-2 py-1 text-accent">
                        {t.enDesarrollo}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[0.95] tracking-[-0.04em] text-fg">
                      {project.landingUrl ? (
                        <a
                          href={project.landingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-accent"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="mono-sm text-fg-3">{project.descriptor}</p>
                  </div>

                  <p className="max-w-xl text-base leading-relaxed text-fg-2">
                    {project.summary}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                    {project.stack.slice(0, 7).map((tech) => (
                      <li
                        key={tech}
                        className="mono-sm border border-rule-strong px-2 py-1 text-fg-3"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {project.landingUrl && (
                      <span className="mono flex items-center gap-2 text-fg">
                        {t.verProducto}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </span>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono link-underline relative z-10 text-fg-2 transition-colors hover:text-fg"
                        aria-label={`${project.name} ${t.githubAriaSuffix}`}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <Reveal>
            <p className="mono text-fg-3">{t.tambienEnElEcosistema}</p>
          </Reveal>

          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {other.map((project) => (
              <li key={project.slug} className="contents">
                <Reveal className="h-full">
                  <div className="flex h-full flex-col gap-1.5 bg-bg p-5">
                    <span className="text-base font-bold tracking-tight text-fg">
                      {project.name}
                    </span>
                    <span className="mono-sm leading-relaxed text-fg-3">
                      {project.descriptor}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Disclosure>
  );
}
