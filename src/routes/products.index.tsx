import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import headerProducts from "@/assets/header-products.jpg";
import { PageHeader } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { getOrigin, origins, products, type Species } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Green Coffee Catalogue — Tropivara" },
      { name: "description", content: "Fifteen green coffee products from eight Indonesian origins: Excelsa from Wonosalam, Arabica from Gayo, Ijen, Flores and Arjuno, Robusta from Temanggung, Dampit and Pagar Alam." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tropivaraindocoffee.lovable.app/products" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Tropivara Green Coffee Catalogue" },
      { property: "og:description", content: "Specifications for every Excelsa, Arabica and Robusta product. Pricing on quotation." },
    ],
    links: [{ rel: "canonical", href: "https://tropivaraindocoffee.lovable.app/products" }],
  }),
  component: Catalog,
});

function Catalog() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Species | "all">("all");
  const opts: (Species | "all")[] = ["all", "excelsa", "arabica", "robusta"];
  const shown = origins.filter((o) => filter === "all" || o.species === filter);
  return (
    <>
      <PageHeader image={headerProducts} eyebrow={t.products.eyebrow} title={t.products.title} lead={t.products.lead} />
      <section className="container-page py-14">
        <div role="group" aria-label={t.products.filterLabel} className="flex flex-wrap gap-2">
          {opts.map((o) => (
            <button key={o} type="button" aria-pressed={filter === o} onClick={() => setFilter(o)}
              className={`btn !py-2 border ${filter === o ? "btn-primary border-forest" : "border-border hover:border-forest"}`}>
              {o === "all" ? t.products.filterAll : t.species[o]}
            </button>
          ))}
        </div>
        {shown.map((o) => {
          const list = products.filter((p) => p.originId === o.id);
          return (
            <div key={o.id} className="mt-14">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
                <h2 className="text-3xl text-forest-deep">{o.title}</h2>
                <p className="text-sm text-muted-foreground">{o.location} · {o.speciesLabel}{o.altitude ? ` · ${o.altitude}` : ""}</p>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>
          );
        })}
        <p className="mt-12 text-xs text-muted-foreground">{products.filter((p) => filter === "all" || getOrigin(p.originId).species === filter).length} {t.common.products} · {t.common.volumeNote}</p>
      </section>
    </>
  );
}
