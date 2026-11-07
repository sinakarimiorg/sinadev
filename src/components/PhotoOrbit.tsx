import Image from "next/image";
import { site } from "@/content/site";

/** Tech chips placed every 45 degrees on the outer ring (percent of the box). */
const chips = [
  { label: "Next.js", left: 50, top: 0 },
  { label: "React", left: 85.36, top: 14.64 },
  { label: "TypeScript", left: 100, top: 50 },
  { label: "JavaScript", left: 85.36, top: 85.36 },
  { label: "Tailwind", left: 50, top: 100 },
  { label: "Framer Motion", left: 14.64, top: 85.36 },
  { label: "Node.js", left: 0, top: 50 },
  { label: "Mongoose", left: 14.64, top: 14.64 },
] as const;

type Props = { photoCaption: string; photoAlt: string };

/** Circular portrait with a pulsing border, halo and an orbit of tech chips. */
export function PhotoOrbit({ photoCaption, photoAlt }: Props) {
  return (
    <div dir="ltr" className="relative aspect-square w-115 max-w-full">
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,249,157,0.20), rgba(217,249,157,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-dashed border-white/18"
        style={{ animation: "spin-slow 44s linear infinite" }}
      >
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${chip.left}%`, top: `${chip.top}%` }}
          >
            <div className="orb">{chip.label}</div>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full border border-lime/20"
        style={{ animation: "spin-rev 28s linear infinite" }}
      >
        <span className="absolute left-1/2 top-0 -ms-1.25 -mt-1.25 size-2.5 rounded-full bg-lime shadow-[0_0_16px_#d9f99d]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-[21%] rounded-full border border-lime/60"
        style={{ animation: "ping-ring 3.4s ease-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-[21%] rounded-full border border-lime/60"
        style={{ animation: "ping-ring 3.4s ease-out 1.7s infinite" }}
      />

      <div
        className="absolute inset-[21%] flex flex-col items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-lime/55 bg-linear-to-br from-[#1b1b22] to-[#0b0b0f] shadow-[0_0_60px_rgba(217,249,157,0.18),inset_0_0_40px_rgba(0,0,0,0.5)]"
        style={{ animation: "floaty 8s ease-in-out infinite" }}
      >
        {site.photo ? (
          <Image
            src={site.photo}
            alt={photoAlt}
            fill
            priority
            sizes="(min-width: 640px) 260px, 55vw"
            className="object-cover"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <span className="relative font-mono text-[clamp(40px,8vw,64px)] font-bold leading-none text-lime">
              SK
            </span>
            <span className="relative font-mono text-[11px] text-mute">{photoCaption}</span>
          </>
        )}
      </div>
    </div>
  );
}
