import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/vazirmatn";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CursorGlow } from "@/components/CursorGlow";
import { Motion } from "@/components/Motion";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getDictionary } from "@/dictionaries";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { site } from "@/content/site";

const ogLocale = { fa: "fa_IR", en: "en_US", tr: "tr_TR" } as const;

export const viewport: Viewport = {
    themeColor: "#09090b",
    colorScheme: "dark",
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const t = getDictionary(locale).meta;

    return {
        metadataBase: new URL(site.url),
        title: t.title,
        description: t.description,
        alternates: {
            canonical: `/${locale}`,
            languages: { fa: "/fa", en: "/en", tr: "/tr", "x-default": "/fa" },
        },
        openGraph: {
            type: "website",
            title: t.title,
            description: t.description,
            url: `/${locale}`,
            locale: ogLocale[locale],
            alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
        },
        twitter: { card: "summary", title: t.title, description: t.description },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return (
        <html lang={locale} dir={dirOf(locale)}>
            <body>
                <Motion>
                    <ScrollProgress />
                    <CursorGlow />
                    {children}
                </Motion>
            </body>
        </html>
    );
}