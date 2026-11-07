/**
 * Everything that is not translated text lives here.
 * Replace the TODO values, drop your files in /public, and you are done.
 */
export const site = {
  handle: "sinakarimidev",

  /** Public URL used for canonical links, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://sinadev.ir",

  // TODO: your real details
  email: "sinakarimidev@gmail.com",
  github: "https://github.com/sinakarimiorg",
  linkedin: "https://www.linkedin.com/in/sina-dev/",

  /** Put the file in /public (for example public/resume.pdf). */
  resume: "/MyResume(En).pdf",

  /** Put your photo in /public and set the path, for example "/sina.jpg". null shows the SK monogram. */
  photo: "/profile.jpg" as string | null,

  timezone: "Asia/Tehran",

  stack: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Redux",
    "Tailwind",
    "Bootstrap",
    "Framer Motion",
    "Node.js",
    "Mongoose",
  ],

  /** Non-translated data for the project list, in the same order as the dictionary. */
  projects: [
    { href: "https://www.kiwitech.ir/", stack: "Next.js 15 · TypeScript · Mongoose · RTL · SEO" },
    { href: "#", stack: "[Stack]" },
    { href: "#", stack: "[Stack]" },
  ],

  /**
   * Greetings for the tilted band, one per living language. The order keeps
   * Chinese, Japanese and Korean apart so the three scripts never sit side by side.
   */
  greetings: [
    { text: "Hello", lang: "en" },
    { text: "你好", lang: "zh" },
    { text: "Hola", lang: "es" },
    { text: "こんにちは", lang: "ja" },
    { text: "سلام", lang: "fa" },
    { text: "Bonjour", lang: "fr" },
    { text: "안녕하세요", lang: "ko" },
    { text: "Merhaba", lang: "tr" },
    { text: "Привет", lang: "ru" },
    { text: "Hallo", lang: "de" },
    { text: "नमस्ते", lang: "hi" },
    { text: "Ciao", lang: "it" },
    { text: "مرحبا", lang: "ar" },
    { text: "Olá", lang: "pt" },
  ],
} as const;

export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

export function isPlaceholder(value: string): boolean {
  return value.includes("your-") || value.includes("your@");
}
