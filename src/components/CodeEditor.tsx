"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { codeTabs, type CodeLine, type CodeTab } from "@/content/code";
import type { Dictionary } from "@/dictionaries";
import { ease } from "@/lib/motion";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

const text = (line: CodeLine) => line.map(([, t]) => t).join("");

/** Lines between the opening `... = {` and the closing `};` are the ones that get typed and erased. */
function bodyRange(tab: CodeTab): [start: number, end: number] | null {
  const open = tab.lines.findIndex((l) => l.length > 0 && text(l).trimEnd().endsWith("{"));
  const close = tab.lines.findIndex((l, i) => i > open && text(l) === "};");
  return open >= 0 && close > open + 1 ? [open + 1, close - 1] : null;
}

/** Type -> hold -> erase -> repeat. Resets when `resetKey` changes; pauses while off screen. */
function useLoopTyping(total: number, running: boolean, resetKey: string): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }
    setCount(0);
    if (!running) return;

    let n = 0;
    let erasing = false;
    let wait = 8;
    const id = setInterval(() => {
      if (wait > 0) {
        wait -= 1;
        return;
      }
      if (!erasing) {
        n = Math.min(total, n + 2);
        if (n >= total) {
          erasing = true;
          wait = 55;
        }
      } else {
        n = Math.max(0, n - 4);
        if (n === 0) {
          erasing = false;
          wait = 14;
        }
      }
      setCount(n);
    }, 45);
    return () => clearInterval(id);
  }, [total, running, resetKey]);

  return count;
}

export function CodeEditor({ t }: { t: Dictionary["code"] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const tab = codeTabs[active] ?? codeTabs[0]!;

  const range = useMemo(() => bodyRange(tab), [tab]);
  const total = useMemo(
    () => (range ? tab.lines.slice(range[0], range[1] + 1).reduce((n, l) => n + text(l).length, 0) : 0),
    [tab, range],
  );
  const typed = useLoopTyping(total, inView, tab.name);

  // Slice the body lines to however many characters are typed so far.
  const rows = useMemo(() => {
    let left = typed;
    let cursorAt = range ? range[0] - 1 : tab.lines.length - 1;
    const out = tab.lines.map((line, i) => {
      if (!range || i < range[0] || i > range[1]) return line;
      const len = text(line).length;
      let take = Math.min(left, len);
      left -= take;
      if (take > 0) cursorAt = i;
      const parts: [CodeLine[number][0], string][] = [];
      for (const [kind, str] of line) {
        if (take <= 0) break;
        const piece = str.slice(0, take);
        take -= piece.length;
        parts.push([kind, piece]);
      }
      return parts as CodeLine;
    });
    return { lines: out, cursorAt };
  }, [tab, range, typed]);

  return (
    <section className="pb-6 pt-[150px]">
      <Tag>{t.tag}</Tag>

      <Reveal className="mt-7">
        <div ref={ref} dir="ltr" className="ed relative">
          <div className="flex items-center border-b border-line bg-ink/60">
            <div className="flex gap-2 px-5" aria-hidden="true">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div role="tablist" aria-label={t.tag} className="flex overflow-x-auto">
              {codeTabs.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`${uid}-panel`}
                  tabIndex={i === active ? 0 : -1}
                  className={`tab ${i === active ? "is-on" : ""}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") setActive((active + 1) % codeTabs.length);
                    if (e.key === "ArrowLeft")
                      setActive((active - 1 + codeTabs.length) % codeTabs.length);
                  }}
                >
                  {item.name}
                  {i === active && (
                    <motion.span
                      layoutId={`${uid}-indicator`}
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-lime"
                      transition={{ duration: 0.35, ease }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${active}`}
            className="code"
          >
            {/* The full file for assistive tech; the animated copy below is decorative. */}
            <pre className="sr-only">{tab.lines.map(text).join("\n")}</pre>
            <div aria-hidden="true">
              {rows.lines.map((line, i) => (
                <div key={i} className="ln">
                  <span className="ln-n">{i + 1}</span>
                  <span>
                    {line.length === 0 ? " " : null}
                    {line.map(([kind, str], j) => (
                      <span key={j} className={kind}>
                        {str}
                      </span>
                    ))}
                    {i === rows.cursorAt && <span className="cursor-bar" />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
