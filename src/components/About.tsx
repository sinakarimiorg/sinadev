import { site } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { LiveClock } from "./LiveClock";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="about" className="pb-6 pt-[150px]">
      <Tag>{t.tag}</Tag>
      <div className="mt-6 flex flex-wrap gap-4">
        <Reveal className="min-w-0 flex-[999_1_520px]">
          <div className="glow h-full">
            <div className="glow-spin" aria-hidden="true" />
            <div className="glow-in h-full p-[clamp(28px,4.5vw,56px)]">
              <h2 className="text-[clamp(26px,3.4vw,42px)] font-semibold leading-normal rtl:tracking-normal ltr:tracking-[-0.03em]">
                {t.title}
              </h2>
              <p className="mt-6 text-lg leading-loose text-body">{t.p1}</p>
              <p className="mt-3.5 text-lg leading-loose text-body">{t.p2}</p>
              <p className="mt-3.5 text-lg leading-loose text-mute">{t.p3}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex min-w-0 flex-[1_1_300px] flex-col gap-4" delay={0.1}>
          <div className="tile px-7 py-6">
            <div className="font-mono text-xs text-mute rtl:font-sans rtl:text-[13px]">{t.locLabel}</div>
            <div className="mt-2 text-2xl font-semibold leading-normal">{t.loc}</div>
            <div className="flex justify-start">
              <LiveClock />
            </div>
          </div>

          <div className="tile flex-1 px-7 py-6">
            <div className="font-mono text-xs text-mute rtl:font-sans rtl:text-[13px]">{t.stackTitle}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.stack.map((name) => (
                <span key={name} className="chip">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="tile px-7 py-[22px]">
            <div className="font-mono text-xs text-mute rtl:font-sans rtl:text-[13px]">{t.eduLabel}</div>
            <div className="mt-1.5 text-lg font-semibold leading-relaxed">{t.edu}</div>
          </div>

          <div className="tile flex items-center justify-between gap-4 px-7 py-[22px]">
            <div>
              <div className="font-mono text-xs text-mute rtl:font-sans rtl:text-[13px]">{t.langLabel}</div>
              <div className="mt-1.5 text-lg font-semibold leading-relaxed">{t.langs}</div>
            </div>
            <div aria-hidden="true" className="flex h-8 items-end gap-1">
              {[0, 0.2, 0.4, 0.6].map((delay) => (
                <span
                  key={delay}
                  className="h-8 w-[5px] origin-bottom rounded-[3px] bg-lime"
                  style={{ animation: `bar 1.2s ease-in-out ${delay}s infinite` }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
