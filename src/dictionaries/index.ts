import type { Locale } from "@/lib/i18n";
import en, { type Dictionary } from "./en";
import fa from "./fa";
import tr from "./tr";

const dictionaries: Record<Locale, Dictionary> = { en, fa, tr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
