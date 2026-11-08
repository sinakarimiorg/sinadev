export type TokenKind = "kw" | "pr" | "st" | "pu" | "nm" | "nv" | "cm";
export type Token = readonly [kind: TokenKind, text: string];
export type CodeLine = readonly Token[];
export type CodeTab = { name: string; lines: readonly CodeLine[] };

/** Syntax-highlighted lines for the "Me, in code" editor. Code stays in English for both locales. */
export const codeTabs: readonly CodeTab[] = [
  {
    name: "sina.ts",
    lines: [
      [["kw", "const"], ["nv", " sina"], ["pu", " = {"]],
      [["pr", "  name"], ["pu", ": "], ["st", '"Sina Karimi"'], ["pu", ","]],
      [["pr", "  role"], ["pu", ": "], ["st", '"Frontend Developer"'], ["pu", ","]],
      [["pr", "  city"], ["pu", ": "], ["st", '"Urmia"'], ["pu", ","]],
      [
        ["pr", "  langs"], ["pu", ": ["], ["st", '"fa"'], ["pu", ", "], ["st", '"tr"'],
        ["pu", ", "], ["st", '"en"'], ["pu", "],"],
      ],
      [
        ["pr", "  stack"], ["pu", ": ["], ["st", '"JavaScript"'], ["pu", ", "],
        ["st", '"TypeScript"'], ["pu", ", "], ["st", '"React"'], ["pu", ", "],
        ["st", '"Next.js"'], ["pu", ", "], ["st", '"Tailwind"'], ["pu", ", "],
        ["st", '"Redux"'], ["pu", ", "], ["st", '"Mongoose"'], ["pu", "],"],
      ],
      [["pr", "  education"], ["pu", ": "], ["st", '"Tourism Management"'], ["pu", ","]],
      [["pr", "  multilingual"], ["pu", ": "], ["nm", "true"], ["pu", ","]],
      [["pu", "};"]],
      [],
      [["kw", "export default"], ["nv", " sina"], ["pu", ";"]],
    ],
  },
  {
    name: "stack.ts",
    lines: [
      [["cm", "// strict types, App Router, RTL-first"]],
      [["kw", "export const"], ["nv", " stack"], ["pu", " = {"]],
      [["pr", "  language"], ["pu", ": ["], ["st", '"HTML"'], ["pu", ", "], ["st", '"CSS"'], ["pu", ", "], ["st", '"JavaScript"'], ["pu", ", "], ["st", '"TypeScript"'], ["pu", "],"]],
      [["pr", "  framework"], ["pu", ": ["], ["st", '"React"'], ["pu", ", "], ["st", '"Next.js"'], ["pu", ", "], ["st", '"Redux"'], ["pu", "],"]],
      [["pr", "  styling"], ["pu", ": ["], ["st", '"Tailwind"'], ["pu", ", "], ["st", '"Bootstrap"'], ["pu", ", "], ["st", '"Framer Motion"'], ["pu", "],"]],
      [["pr", "  backend"], ["pu", ": ["], ["st", '"Node.js"'], ["pu", ", "], ["st", '"Mongoose"'], ["pu", "],"]],
      [["pu", "};"]],
    ],
  },
  {
    name: "kiwitech.ts",
    lines: [
      [["cm", "// Persian e-commerce storefront"]],
      [["kw", "export const"], ["nv", " kiwitech"], ["pu", " = {"]],
      [["pr", "  direction"], ["pu", ": "], ["st", '"rtl"'], ["pu", ","]],
      [["pr", "  framework"], ["pu", ": "], ["st", '"Next.js 15"'], ["pu", ","]],
      [["pr", "  database"], ["pu", ": "], ["st", '"Mongoose"'], ["pu", ","]],
      [["pr", "  seo"], ["pu", ": "], ["nm", "true"], ["pu", ","]],
      [["pu", "};"]],
    ],
  },
];
