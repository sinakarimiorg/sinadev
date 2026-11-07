export const locales = ["fa", "en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

/** 1 -> "01" in English, "۰۱" in Persian. */
export function pad(n: number, locale: Locale): string {
  return n.toLocaleString(locale === "fa" ? "fa-IR" : locale === "tr" ? "tr-TR" : "en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
