import { site } from "@/content/site";
import type { Dictionary } from "@/dictionaries";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-mute">
        <span>{t.rights}</span>
        <span className="font-mono" dir="ltr">
          {site.handle}
        </span>
      </div>
    </footer>
  );
}
