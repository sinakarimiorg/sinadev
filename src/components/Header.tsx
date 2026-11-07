"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { locales, type Locale } from "@/lib/i18n";
import { CommandPalette } from "./CommandPalette";

const sections = ["about", "work", "contact"] as const;
const labels: Record<Locale, string> = { fa: "فارسی", en: "EN", tr: "TR" };
const names: Record<Locale, string> = { fa: "فارسی", en: "English", tr: "Türkçe" };

type Props = { locale: Locale; nav: Dictionary["nav"]; palette: Dictionary["palette"] };

export function Header({ locale, nav, palette }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const hrefFor = (target: Locale) => pathname.replace(/^\/(fa|en|tr)(?=\/|$)/, `/${target}`);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘ K");
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-2">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-mono text-sm font-medium">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-lime"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          {site.handle}
        </a>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <nav aria-label="Primary" className="hidden items-center gap-x-6 md:flex">
            {sections.map((id) => (
              <a key={id} href={`#${id}`} className="nav-link flex min-h-11 items-center text-sm">
                {nav[id]}
              </a>
            ))}
          </nav>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-full border border-lime/50 px-4 text-sm font-medium text-lime transition-colors hover:bg-lime hover:text-lime-ink sm:flex"
          >
            {nav.resume}
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={nav.palette}
            aria-haspopup="dialog"
            className="hidden min-h-11 items-center rounded-[10px] border border-zinc-800 px-3 font-mono text-xs text-mute transition-colors hover:border-lime hover:text-lime sm:flex"
          >
            {shortcut}
          </button>

          <div
            role="group"
            aria-label={nav.switchTo}
            className="flex gap-0.5 rounded-full border border-zinc-800 bg-ink/70 p-0.5"
          >
            {locales.map((l) => (
              <Link
                key={l}
                href={hrefFor(l)}
                scroll={false}
                lang={l}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                aria-label={names[l]}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3.5 text-[13px] font-medium transition-colors ${
                  l === locale ? "bg-lime text-lime-ink" : "text-soft hover:text-white"
                }`}
              >
                {labels[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CommandPalette open={open} onClose={() => setOpen(false)} t={palette} hrefFor={hrefFor} />
    </header>
  );
}
