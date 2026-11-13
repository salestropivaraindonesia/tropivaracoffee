import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { getOrigin, getProduct, productImage, productLabel, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { mailtoLink, whatsappLink } from "@/config/contact";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const label = p ? productLabel(p) : "Product";
    return {
      meta: [
        { title: `${label} — Tropivara Green Coffee` },
        { name: "description", content: p ? `${label}: ${p.process.en}.${p.flavor ? ` ${p.flavor.en}.` : ""}` : "Tropivara green coffee product." },
        { property: "og:type", content: "product" },
        ...(p ? [{ property: "og:url", content: `https://tropivaraindocoffee.lovable.app/products/${p.slug}` }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: `${label} — Tropivara` },
        { property: "og:description", content: p ? `${p.flavor ? `${p.flavor.en}. ` : ""}${p.process.en}.` : "Tropivara green coffee." },
      ],
      links: p ? [{ rel: "canonical", href: `https://tropivaraindocoffee.lovable.app/products/${p.slug}` }] : [],
    };
  },
  component: Detail,
});

function Detail() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const o = getOrigin(p.originId);
  const { t, lang } = useI18n();
  const label = productLabel(p);
  const msg = `${t.contact.greeting}\n\n${t.common.inquire}: ${label} (${p.ref}).`;
  const wa = whatsappLink(msg);
  const rows: [string, string | undefined][] = [
    [t.spec.ref, p.ref],
    [t.spec.origin, o.location],
    [t.spec.species, o.speciesLabel],
    [t.spec.altitude, p.altitude ?? o.altitude],
    [t.spec.process, p.process[lang]],
    [t.spec.flavor, p.flavor?.[lang]],
    [t.spec.grade, p.grade],
    [t.spec.variety, p.variety],
    [t.spec.screen, p.screen],
    [t.spec.moisture, p.moisture],
    [t.spec.defects, p.defects],
    [t.spec.acidity, p.acidity?.[lang]],
    [t.spec.volume, p.volume?.[lang]],
  ];
  const related = products.filter((x) => x.originId === o.id && x.slug !== p.slug);
  return (
    <>
      <div className="container-page pt-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-forest"><ArrowLeft className="h-4 w-4" /> {t.common.back}</Link>
      </div>
      <section className="container-page grid gap-12 py-10 lg:grid-cols-[1fr_1.1fr]">
        <figure>
          <img src={productImage(p)} alt={`${p.name} — green coffee beans`} width={606} height={800} className="aspect-square w-full object-cover" />
        </figure>
        <div>
          <p className="eyebrow">{p.ref} · {o.title}</p>
          <h1 className="mt-3 text-4xl leading-tight text-forest-deep md:text-5xl">{p.name}</h1>
          <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((tag) => <li key={tag} className="border border-border px-2 py-1 text-xs uppercase tracking-wider">{tag}</li>)}</ul>
          <h2 className="eyebrow mt-10">{t.detail.specs}</h2>
          <dl className="mt-3 divide-y divide-border border-y border-border">
            {rows.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[11rem_1fr]"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">{t.common.volumeNote}</p>
          <div className="mt-10 bg-forest-deep p-7 text-forest-foreground">
            <h2 className="text-2xl">{t.detail.inquiryT}</h2>
            <p className="mt-2 text-sm text-forest-foreground/80">{t.detail.inquiryB}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" search={{ product: p.slug }} className="btn btn-ivory">{t.detail.formCta}</Link>
              <a href={mailtoLink(`${t.contact.subject}: ${label}`, msg)} className="btn btn-outline"><Mail className="h-4 w-4" /> {t.common.email}</a>
              {wa ? <a href={wa} target="_blank" rel="noreferrer" className="btn btn-outline"><MessageCircle className="h-4 w-4" /> {t.common.whatsapp}</a>
                : <span aria-disabled="true" className="btn btn-outline"><MessageCircle className="h-4 w-4" /> {t.common.whatsappSoon}</span>}
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="container-page border-t border-border py-16">
          <h2 className="text-3xl text-forest-deep">{t.detail.related}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
        </section>
      )}
    </>
  );
}
