const en = {
  meta: {
    title: "Sina Karimi · Frontend Developer",
    description:
      "Frontend developer in Urmia, Iran. Fast, bilingual (Persian and English) interfaces built with Next.js, TypeScript and Tailwind.",
  },
  nav: {
    about: "About",
    work: "Work",
    contact: "Contact",
    resume: "Resume",
    switchTo: "Switch language",
    palette: "Open command menu",
  },
  hero: {
    hi: "Hi, I am",
    name: "Sina Karimi",
    roles: ["Frontend Developer", "Next.js Engineer", "Interface Craftsman"],
    sub: "I build fast, bilingual interfaces with Next.js, TypeScript and Tailwind, with just enough motion to make them feel alive.",
    cta1: "See my work",
    cta2: "Get in touch",
    open: "Open to work",
    photoCap: "[YOUR PHOTO]",
    photoAlt: "Portrait of Sina Karimi",
    capRole: "Frontend Developer · Urmia",
  },
  about: {
    tag: "// about.md",
    title: "A developer who cares how the web feels.",
    p1: "I am Sina, a frontend developer based in Urmia, Iran. I work with JavaScript and TypeScript, and I build on Next.js and Tailwind.",
    p2: "I care about Persian-first products: proper RTL layouts, typography that reads well, and sites that work in both Persian and English.",
    p3: "My background is in tourism management, which taught me to design for real people: clear, welcoming and easy to use.",
    locLabel: "BASED IN",
    loc: "Urmia, Iran",
    stackTitle: "STACK",
    langLabel: "LANGUAGES",
    langs: "Persian · Turkish · English",
    eduLabel: "EDUCATION",
    edu: "Bachelor's in Tourism Management",
  },
  code: {
    tag: "// sina.ts",
  },
  work: {
    tag: "// projects/",
    title: "Selected work",
    featured: "FEATURED",
    view: "View project",
    roleLabel: "ROLE",
    roleValue: "[your role]",
    liveLabel: "LIVE",
    liveValue: "[link]",
    items: [
      {
        name: "KiwiTech",
        tag: "Next.js · Mongoose · RTL · SEO",
        desc: "Persian RTL e-commerce storefront with SEO, product pages and a Mongoose-backed API.",
      },
      {
        name: "Moboland",
        tag: "JavaScript · React · Tailwind Css",
        desc: "An online store as a practice project for peripheral products",
      },
      {
        name: "Coffee Store",
        tag: "Html 5 · Css · JavaScript · Tailwind Css · mongoose",
        desc: "A practice project to strengthen styling skills and code cleanliness.",
      },
    ],
  },
  contact: {
    tag: "// contact",
    title: "Have a project in mind? Let us talk.",
    sub: "Tell me about the project, the languages it needs and where it should end up.",
    copyHint: "click to copy",
    copied: "copied to clipboard",
    links: ["GitHub", "LinkedIn", "Resume (PDF)"],
  },
  palette: {
    title: "Jump to",
    items: {
      about: "About",
      work: "Work",
      contact: "Contact",
      resume: "Resume",
      fa: "Switch to Persian",
      en: "Switch to English",
      tr: "Switch to Turkish",
      copy: "Copy email",
    },
  },
  footer: {
    rights: "© 2026 Sina Karimi",
  },
};

export type Dictionary = typeof en;
export default en;
