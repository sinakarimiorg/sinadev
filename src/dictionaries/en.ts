const en = {
  meta: {
    title: "Sina Karimi · Frontend Developer",
    description:
      "Frontend Developer based in Urmia. Building modern and fast web applications with Next.js, TypeScript, React, and Tailwind CSS.",
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
    sub: "Building modern, fast, and scalable web applications with React, Next.js, and TypeScript—focused on clean code, top performance, and fluid interactions.",
    cta1: "See my work",
    cta2: "Get in touch",
    open: "Open to work",
    photoCap: "[YOUR PHOTO]",
    photoAlt: "Portrait of Sina Karimi",
    capRole: "Frontend Developer",
  },
  about: {
    tag: "// about.md",
    title: "A developer who cares about how the web feels.",
    p1: "I'm Sina, a Frontend Developer based in Urmia. I specialize in JavaScript and TypeScript, focusing on building fast, modern web applications with React, Next.js, and Tailwind CSS.",
    p2: "I use Redux for state management and Mongoose for database handling. From clean code and scalable components to RTL layouts and multilingual support, details matter to me.",
    p3: "Despite a background in Tourism Management, my approach to the web is deeply user-centric—building interfaces that are clear, simple, and functional for real people.",
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
