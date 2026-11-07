import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { CodeEditor } from "@/components/CodeEditor";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelloBand } from "@/components/HelloBand";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Work } from "@/components/Work";
import { isPlaceholder, site } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = getDictionary(locale);

    const sameAs = [site.github, site.linkedin].filter((u) => !isPlaceholder(u));
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: t.hero.name,
        jobTitle: t.hero.roles[0],
        url: `${site.url}/${locale}`,
        address: { "@type": "PostalAddress", addressLocality: "Urmia", addressCountry: "IR" },
        knowsLanguage: ["fa", "tr", "en"],
        ...(sameAs.length > 0 ? { sameAs } : {}),
    };

    return (
        <>
            <script
                type="application/ld+json"
                // Static, trusted data; "<" is escaped so it can never close the tag.
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />
            <Header locale={locale} nav={t.nav} palette={t.palette} />
            <main className="relative z-10 mx-auto max-w-295 overflow-x-clip px-6">
                <Hero t={t.hero} />
                <TechMarquee />
                <About t={t.about} />
                <HelloBand />
                <CodeEditor t={t.code} />
                <Work t={t.work} locale={locale} />
                <Contact t={t.contact} />
            </main>
            <Footer t={t.footer} />
        </>
    );
}
