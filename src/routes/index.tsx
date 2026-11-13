import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { origins, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { InquiryCta } from "@/components/site/InquiryCta";
import hero from "@/assets/green-coffee-photo.jpg.asset.json";
import beds from "@/assets/coffee-harvest-photo.jpg.asset.json";
import tv01 from "@/assets/tv-01.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tropivara — Indonesian Green Coffee for Roasters & Wholesalers" },
      { name: "description", content: "Indonesian green coffee beans supplier (green bean kopi / kopi hijau) — Excelsa, Arabica and Robusta from eight origins for wholesalers, roasters and coffee manufacturers. Inquire via WhatsApp or email." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tropivaraindocoffee.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Tropivara — Indonesian Green Coffee Supplier" },
      { property: "og:description", content: "B2B green coffee from Wonosalam, Gayo, Ijen, Flores, Arjuno, Temanggung, Dampit and Pagar Alam." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"Tropivara Indonesia","url":"https://tropivaraindocoffee.lovable.app/","logo":"https://tropivaraindocoffee.lovable.app/favicon.png","email":"salestropivaraindonesia@gmail.com","telephone":"+62 851 9657 2911","address":{"@type":"PostalAddress","addressRegion":"Gresik Regency, East Java","addressCountry":"ID"},"sameAs":["https://www.instagram.com/tropivaraindonesia/","https://web.facebook.com/tropivaraindonesia","https://www.linkedin.com/in/tropivara-indonesia-3726a8440"],"description":"Indonesian green coffee supplier for wholesalers, roasters and manufacturers."}) }],
    links: [{ rel: "canonical", href: "https://tropivaraindocoffee.lovable.app/" }],
  }),
  component: Home,
});

const featured = ["excelsa-hand-picked-red-cherry", "gayo-natural-grade-1", "ijen-fully-washed-grade-1", "temanggung-natural-grade-1"];

function Home() {
  const { t } = useI18n();
  const h = t.home;
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 pt-14 pb-6 md:pt-20 md:pb-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">{h.eyebrow}</p>
            <h1 className="mt-5 text-4xl leading-[1.02] text-forest-deep sm:text-5xl lg:text-[4.2rem]">{h.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{h.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary">{t.common.explore} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contact" className="btn btn-outline text-forest">{t.common.contactTeam}</Link>
            </div>
          </div>
          <figure className="relative pb-16 pl-10 lg:pl-16">
            <img src={hero.url} alt="Close-up of unroasted coffee beans" width={1600} height={1072} className="aspect-[5/6] w-full object-cover" />
            <img src={tv01.url} alt="Tropivara Excelsa green beans" width={606} height={800} className="absolute bottom-0 left-0 w-2/5 border-8 border-background object-cover shadow-sm" />
          </figure>
        </div>
        <div className="container-page pb-14 pt-2 md:pb-20">
          <dl className="mx-auto grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-6">
            {h.stats.map((s) => (
              <div key={s.l} className="text-center"><dt className="sr-only">{s.l}</dt><dd className="text-center"><span className="font-display text-4xl text-coffee">{s.n}</span><span className="block text-xs uppercase tracking-widest text-muted-foreground">{s.l}</span></dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-forest-deep text-forest-foreground">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow !text-accent">{h.introEyebrow}</p>
            <h2 className="mt-4 text-3xl md:text-4xl">{h.introTitle}</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-forest-foreground/80">{h.introBody}</p>
            <p className="font-display text-2xl italic text-accent">{h.quote}</p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">{t.nav.about} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">{h.featuredEyebrow}</p><h2 className="mt-3 text-3xl md:text-4xl text-forest-deep">{h.featuredTitle}</h2></div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline">{t.common.allProducts} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => <ProductCard key={s} product={products.find((p) => p.slug === s)!} />)}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="container-page py-20">
          <p className="eyebrow">{h.originsEyebrow}</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-forest-deep">{h.originsTitle}</h2>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {origins.map((o, i) => (
              <li key={o.id}>
                <Link to="/origins" hash={o.id} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5 hover:bg-background/60 md:grid-cols-[3rem_1.4fr_1fr_1fr]">
                  <span className="font-display text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl text-forest-deep">{o.title}</span>
                  <span className="col-start-2 text-sm text-muted-foreground md:col-start-auto">{o.location}</span>
                  <span className="col-start-2 text-sm md:col-start-auto">{t.species[o.species]}{o.altitude ? ` · ${o.altitude}` : ""}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page grid items-stretch gap-12 py-20 md:grid-cols-2">
        <img src={beds.url} alt="Coffee harvest with cherries drying" loading="lazy" width={1200} height={1200} className="aspect-[4/3] h-full w-full object-cover md:aspect-auto md:max-h-[26rem]" />
        <div className="self-center">
          <p className="eyebrow">{h.qcEyebrow}</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-forest-deep">{h.qcTitle}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{h.qcBody}</p>
          <Link to="/quality" className="btn btn-outline mt-8 text-forest">{h.qcLink}</Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-20">
          <p className="eyebrow text-center">{h.whyEyebrow}</p>
          <h2 className="mt-3 text-center text-3xl md:text-4xl text-forest-deep">{h.whyTitle}</h2>
          <dl className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {h.why.map((c) => (
              <div key={c.t} className="border-l border-coffee/45 pl-5">
                <dt className="text-2xl font-display text-forest-deep">{c.t}</dt>
                <dd className="mt-2 max-w-md text-muted-foreground">{c.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <InquiryCta />
    </>
  );
}
