"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Current time in the configured timezone. Renders after mount to avoid a hydration mismatch. */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-GB", { timeZone: site.timezone, hour12: false });
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-1.5 flex items-center gap-2.5 font-mono text-xl text-lime" dir="ltr">
      <span
        aria-hidden="true"
        className="size-2 rounded-full bg-lime"
        style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
      />
      <span className="tabular-nums">{time ?? "--:--:--"}</span>
    </div>
  );
}
