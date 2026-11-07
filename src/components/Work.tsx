"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { ease } from "@/lib/motion";
import { pad, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

export function Work({ t, locale }: { t: Dictionary["work"]; locale: Locale }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <section id="work" className="pb-6 pt-[150px]">
      <Tag>{t.tag}</Tag>
      <h2 className="mt-3.5 text-[clamp(30px,4.2vw,52px)] font-semibold leading-tight rtl:tracking-normal ltr:tracking-[-0.03em]">
        {t.title}
      </h2>

      <Reveal className="mt-10 border-b border-line">
        {t.items.map((item, i) => {
          const isOpen = open === i;
          const project = site.projects[i];
          const external = project && project.href.startsWith("http");
          return (
            <div key={i} className="row">
              <button
                type="button"
                className="acc"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="font-mono text-sm text-mute">{pad(i + 1, locale)}</span>
                <span
                  className={`acc-title min-w-0 flex-1 text-[clamp(24px,3.6vw,44px)] font-semibold leading-snug ${
                    isOpen ? "is-on" : ""
                  }`}
                >
                  {item.name}
                </span>
                <span className="hidden font-mono text-[13px] text-mute sm:inline" dir="ltr">
                  {item.tag}
                </span>
                <svg
                  className={`acc-ico ${isOpen ? "is-open" : ""}`}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${uid}-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap items-end justify-between gap-6 px-1 pb-9">
                      <div className="max-w-[560px]">
                        {i === 0 && (
                          <div className="mb-3 font-mono text-xs text-lime">{t.featured}</div>
                        )}
                        <p className="text-lg leading-loose text-body">{item.desc}</p>
                        <p className="mt-3 font-mono text-[13px] text-mute" dir="ltr">
                          {project?.stack}
                        </p>
                        {i === 0 && (
                          <p className="mt-3.5 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[13px] text-soft">
                            <span>
                              <span className="text-mute">{t.roleLabel}</span> {t.roleValue}
                            </span>
                            <span>
                              <span className="text-mute">{t.liveLabel}</span> {t.liveValue}
                            </span>
                          </p>
                        )}
                      </div>
                      {project && project.href !== "#" && (
                        <a
                          href={project.href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-zinc-700 px-6 text-[15px] font-medium transition-colors hover:border-lime hover:text-lime"
                        >
                          {t.view}
                          <span aria-hidden="true" className="rtl:-scale-x-100">
                            →
                          </span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
