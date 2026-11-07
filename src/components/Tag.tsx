import type { ReactNode } from "react";

/** The small monospace "// label" that opens every section. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="tag">
      <span dir="ltr">{children}</span>
    </div>
  );
}
