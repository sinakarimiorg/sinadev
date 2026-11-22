"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { isLocale } from "@/lib/i18n";

/**
 * Tilted lime band with a greeting in many languages. It drifts sideways as you scroll,
 * pauses on hover, and the English, Persian and Turkish greetings switch the site language.
 *
 * The scroll drift and the marquee only start after mount and after fonts have loaded,
 * so the first paint never measures a half-laid-out page.
 */
export function HelloBand() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  useEffect(() => {
    setMounted(true);
    let alive = true;
    const done = () => alive && setReady(true);
    if (document.fonts?.ready) {
      document.fonts.ready.then(done, done);
    } else {
      done();
    }
    // Safety net: never leave the band hidden if fonts.ready is slow.
    const t = setTimeout(done, 1500);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  const word =
    "flex cursor-pointer items-center gap-10 whitespace-nowrap ps-10 text-[clamp(32px,6vw,64px)] font-bold leading-none text-lime-ink transition-transform duration-300 hover:scale-[1.06]";
  const star = <span className="text-[0.6em]">✦</span>;

  const copy = (hidden: boolean) =>
    site.greetings.map(({ text, lang }) => {
      const key = `${hidden ? "b" : "a"}-${lang}`;
      if (isLocale(lang)) {
        return (
          <Link
            key={key}
            href={pathname.replace(/^\/(fa|en|tr)(?=\/|$)/, `/${lang}`)}
            scroll={false}
            lang={lang}
            hrefLang={lang}
            tabIndex={hidden ? -1 : undefined}
            className={`${word} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-ink`}
          >
            {text}
            {star}
          </Link>
        );
      }
      return (
        <span key={key} lang={lang} className={word}>
          {text}
          {star}
        </span>
      );
    });

  return (
    <div ref={ref} className="relative mt-32.5 overflow-hidden py-10">
      <div className="band -mx-10 -rotate-2 overflow-hidden bg-lime py-5 text-lime-ink">
        <motion.div style={mounted && !reduce ? { x: shift } : undefined}>
          <div
            dir="ltr"
            className="band-track flex w-max"
            style={{
              opacity: ready ? 1 : 0,
              transition: "opacity 0.3s",
              animationPlayState: ready ? undefined : "paused",
            }}
          >
            <div className="flex">{copy(false)}</div>
            <div className="flex" aria-hidden="true">
              {copy(true)}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
