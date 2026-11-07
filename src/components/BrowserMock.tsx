import Image from "next/image";

type Props = {
  /** Screenshot in /public, e.g. "/projects/kiwitech.jpg". null shows the animated placeholder. */
  image: string | null;
  alt: string;
  /** Shown in the address bar. */
  url: string;
};

/** A browser window that frames a project screenshot, or a skeleton page when there is none. */
export function BrowserMock({ image, alt, url }: Props) {
  return (
    <div
      dir="ltr"
      className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#0c0c0f] shadow-[0_30px_70px_rgba(0,0,0,0.45),0_0_50px_rgba(217,249,157,0.05)]"
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-ink/60 px-4 py-2.5" aria-hidden="true">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto min-w-0 max-w-65 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-mute">
          {url}
        </div>
        <span className="w-10.5" />
      </div>

      {image ? (
        <Image
          src={image}
          alt={alt}
          width={1200}
          height={750}
          sizes="(min-width: 768px) 520px, 100vw"
          className="block h-auto w-full"
        />
      ) : (
        <div aria-hidden="true" className="p-4">
          <div className="flex items-center justify-between">
            <span className="h-3 w-24 rounded-full bg-lime" />
            <span className="flex gap-2">
              <span className="h-3 w-10 rounded-full bg-white/8" />
              <span className="h-3 w-10 rounded-full bg-white/8" />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`relative h-28 overflow-hidden rounded-xl bg-white/4 ${i === 1 ? "shimmer" : ""}`}
              />
            ))}
          </div>
          <div className="mt-4 h-2.5 w-2/3 rounded-full bg-white/8" />
        </div>
      )}
    </div>
  );
}
