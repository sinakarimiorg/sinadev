"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/dictionaries";
import { ease } from "@/lib/motion";
import { useTypewriter } from "@/lib/useTypewriter";
import { Magnetic } from "./Magnetic";
import { PhotoOrbit } from "./PhotoOrbit";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  const typed = useTypewriter(t.roles);

  return (
    <section id="top" className="flex flex-wrap items-center gap-x-10 gap-y-14 pb-32 pt-20">
      <motion.div
        className="min-w-0 flex-[1_1_420px]"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="mb-6 inline-flex min-h-8.5 items-center gap-2.5 rounded-full border border-lime/30 bg-lime/5 px-3.5 text-[13px] text-lime">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-lime"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
          {t.open}
        </span>
        <div className="font-mono text-sm text-mute">
          <span dir="ltr">{"// hello, world"}</span>
        </div>
        <p className="mt-6 text-[19px] font-medium text-soft">{t.hi}</p>
        <h1 className="mt-1.5 text-[clamp(34px,4.4vw,56px)] font-semibold leading-tight text-lime rtl:tracking-normal ltr:tracking-[-0.03em]">
          {t.name}
        </h1>

        <div className="mt-4.5 flex min-h-11 items-center font-mono text-[clamp(17px,2.2vw,24px)] text-zinc-200 rtl:font-sans">
          <span aria-hidden="true" className="me-2.5 text-mute">
            &gt;
          </span>
          <span aria-hidden="true">{typed}</span>
          <span aria-hidden="true" className="cursor-bar" />
          <span className="sr-only">{t.roles[0]}</span>
        </div>

        <p className="mt-4.5 max-w-130 text-lg leading-[1.95] text-soft">{t.sub}</p>

        <div className="mt-8.5 flex flex-wrap gap-3">
          <Magnetic>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center rounded-xl bg-lime px-6.5 text-[15px] font-semibold text-lime-ink"
            >
              {t.cta1}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-xl border border-zinc-700 px-6.5 text-[15px] font-medium transition-colors hover:border-lime hover:text-lime"
            >
              {t.cta2}
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <motion.div
        className="flex min-w-0 flex-[1_1_400px] flex-col items-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
      >
        <PhotoOrbit photoCaption={t.photoCap} photoAlt={t.photoAlt} />
        <div className="mt-8 text-center font-mono text-[13px] text-mute rtl:font-sans rtl:text-sm">{t.capRole}</div>
      </motion.div>
    </section>
  );
}
