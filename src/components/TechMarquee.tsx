import { site } from "@/content/site";

/** Full-bleed scrolling strip of the stack, decorative only. */
export function TechMarquee() {
  const loop = [...site.stack, ...site.stack];

  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className="-mx-6 overflow-hidden border-y border-line py-5"
    >
      <div className="flex w-max" style={{ animation: "marq 34s linear infinite" }}>
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap px-7 font-mono text-xl text-zinc-300"
          >
            {name}
            <span className="ms-14 text-lime">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
