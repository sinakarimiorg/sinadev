"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  t: Dictionary["palette"];
  hrefFor: (locale: Locale) => string;
};

type Item = { id: string; label: string; hint: string; run: () => void };

const scrollTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Ctrl/Cmd+K menu: jump to a section, open the resume, switch language, copy the email. */
export function CommandPalette({ open, onClose, t, hrefFor }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const items: Item[] = [
    { id: "about", label: t.items.about, hint: "↗", run: scrollTo("about") },
    { id: "work", label: t.items.work, hint: "↗", run: scrollTo("work") },
    { id: "contact", label: t.items.contact, hint: "↗", run: scrollTo("contact") },
    { id: "resume", label: t.items.resume, hint: "PDF", run: () => window.open(site.resume, "_blank") },
    ...locales.map((l) => ({
      id: l,
      label: t.items[l],
      hint: l.toUpperCase(),
      run: () => router.push(hrefFor(l), { scroll: false }),
    })),
    {
      id: "copy",
      label: t.items.copy,
      hint: "copy",
      run: () => void navigator.clipboard?.writeText(site.email).catch(() => {}),
    },
  ];

  // Focus the list when it opens and give focus back to whatever opened it.
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    setIndex(0);
    return () => opener.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (open) refs.current[index]?.focus();
  }, [open, index]);

  const onKeyDown = (e: KeyboardEvent) => {
    const n = items.length;
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      setIndex((i) => (i + 1) % n);
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      setIndex((i) => (i - 1 + n) % n);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            className="w-full max-w-[560px] overflow-hidden rounded-[20px] border border-zinc-800 bg-panel shadow-[0_40px_90px_rgba(0,0,0,0.6),0_0_60px_rgba(217,249,157,0.08)]"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div dir="ltr" className="px-5 py-4 font-mono text-[13px] text-mute">
              {t.title} · ↑ ↓ · Enter · Esc
            </div>
            <div role="menu">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="menuitem"
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => {
                    onClose();
                    item.run();
                  }}
                  className={`flex min-h-12 w-full items-center justify-between gap-3 border-t border-line px-5 text-start text-[15px] transition-colors ${
                    i === index ? "bg-lime/10 text-lime" : "text-zinc-200"
                  } focus-visible:outline-none`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-mute">{item.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
