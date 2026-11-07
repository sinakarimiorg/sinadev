"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { displayUrl, isPlaceholder, site } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, rgba(217,249,157,0.14), transparent 65%)`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Clipboard can be blocked; fall back to opening the mail client.
      window.location.href = `mailto:${site.email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  const links = [
    { name: t.links[0], href: site.github, sub: displayUrl(site.github), external: true },
    { name: t.links[1], href: site.linkedin, sub: displayUrl(site.linkedin), external: true },
    { name: t.links[2], href: site.resume, sub: "resume.pdf", external: false },
  ];

  return (
    <section id="contact" className="pb-24 pt-[150px]">
      <Tag>{t.tag}</Tag>
      <Reveal className="mt-6">
        <div
          className="spot p-[clamp(28px,5vw,72px)]"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            x.set(((e.clientX - r.left) / r.width) * 100);
            y.set(((e.clientY - r.top) / r.height) * 100);
          }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: spotlight }}
          />
          <div className="relative">
            <h2 className="max-w-[760px] text-[clamp(30px,4.6vw,60px)] font-semibold leading-tight rtl:tracking-normal ltr:tracking-[-0.03em]">
              {t.title}
            </h2>
            <p className="mt-5 max-w-[540px] text-[17px] leading-loose text-soft">{t.sub}</p>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <button
                type="button"
                dir="ltr"
                className={`mail ${copied ? "is-ok" : ""}`}
                onClick={copy}
                aria-label={`${site.email} — ${t.copyHint}`}
              >
                <span>{site.email}</span>
                <span className="relative inline-flex size-5 items-center justify-center" aria-hidden="true">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.svg
                      key={copied ? "ok" : "copy"}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.4, opacity: 0, rotate: 40 }}
                      transition={{ duration: 0.18 }}
                    >
                      {copied ? (
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      ) : (
                        <>
                          <rect x="9" y="9" width="11" height="11" rx="2" />
                          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                        </>
                      )}
                    </motion.svg>
                  </AnimatePresence>
                </span>
              </button>
              <span className="font-mono text-[13px] text-mute" role="status" aria-live="polite">
                {copied ? t.copied : t.copyHint}
              </span>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="link-tile"
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                >
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold">{l.name}</span>
                    <span className="mt-0.5 block truncate font-mono text-xs text-mute" dir="ltr">
                      {l.sub}
                    </span>
                  </span>
                  <svg
                    className="arrow rtl:-scale-x-100"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
