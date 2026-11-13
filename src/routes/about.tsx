import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/LanguageProvider";
import headerAbout from "@/assets/header-about.jpg";
import { PageHeader } from "@/components/site/Layout";
import { InquiryCta } from "@/components/site/InquiryCta";
import cherries from "@/assets/coffee-harvest-photo.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tropivara — Indonesian Green Coffee Supplier" },
      { name: "description", content: "Who Tropivara is, how we work with business buyers, and our commitment to transparent product information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tropivaraindocoffee.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "About Tropivara" },
      { property: "og:description", content: "An Indonesian green coffee supplier for wholesalers, roasters and coffee manufacturers." },
    ],
    links: [{ rel: "canonical", href: "https://tropivaraindocoffee.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <>
      <PageHeader image={headerAbout} eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
      <section className="container-page grid gap-12 py-20 md:grid-cols-2">
        <img src={cherries.url} alt="Hand holding harvested coffee cherries" loading="lazy" width={1200} height={1200} className="aspect-square w-full object-cover" />
        <div className="space-y-5">
          {a.paragraphs.map((p) => <p key={p.slice(0, 24)} className="text-muted-foreground">{p}</p>)}
        </div>
      </section>
      <section className="border-y border-border bg-secondary/50">
        <div className="container-page py-20">
          <div className="grid gap-px bg-border md:grid-cols-2">
            <div className="bg-background p-7"><h2 className="text-center text-2xl text-forest-deep">{a.visionT}</h2><p className="mt-3 text-muted-foreground">{a.vision}</p></div>
            <div className="bg-background p-7">
              <h2 className="text-center text-2xl text-forest-deep">{a.missionT}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">{a.mission.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          </div>
          <h2 className="mt-16 text-center text-3xl text-forest-deep">{a.valuesT}</h2>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {a.values.map((v) => (
              <div key={v.t} className="bg-background p-6"><h3 className="text-xl text-forest-deep">{v.t}</h3><p className="mt-2 text-sm text-muted-foreground">{v.d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-20">
        <h2 className="text-center text-3xl text-forest-deep">{a.servicesT}</h2>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {a.services.map((s) => (
            <div key={s.t} className="bg-background p-7"><h3 className="text-xl text-forest-deep">{s.t}</h3><p className="mt-2 text-sm text-muted-foreground">{s.d}</p></div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{a.servicesNote}</p>
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-3xl text-forest-deep">{a.priceTermsT}</h2><p className="mt-4 text-lg text-muted-foreground">{a.priceTerms}</p>
        </div>
      </section>
      <section className="border-t border-border">
        <div className="container-page py-20">
          <h2 className="text-center text-3xl text-forest-deep">{a.howWeWorkT}</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {a.howWeWork.map((step, i) => (
              <li key={step} className="border-t border-border pt-5">
                <span aria-hidden="true" className="block text-center font-display text-3xl text-coffee">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <InquiryCta />
    </>
  );
}
