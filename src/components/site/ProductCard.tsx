import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getOrigin, productImage, type Product } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";

export function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  const origin = getOrigin(product.originId);
  return (
    <article className="group flex flex-col border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={productImage(product)} alt={`${product.name} — green coffee beans`} loading="lazy" width={606} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-card/95 px-2 py-1 text-xs font-semibold tracking-wider text-coffee">{product.ref}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{origin.title} · {t.species[origin.species]}</p>
        <h3 className="mt-2 text-2xl leading-tight text-forest-deep">{product.name}</h3>
        {product.flavor && <p className="mt-4 text-sm italic">{product.flavor[lang]}</p>}
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border pt-4 text-xs">
          <div><dt className="text-muted-foreground">{t.spec.process}</dt><dd className="font-medium">{product.process[lang]}</dd></div>
          {product.moisture && <div><dt className="text-muted-foreground">{t.spec.moisture}</dt><dd className="font-medium">{product.moisture}</dd></div>}
        </dl>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="btn btn-primary !py-2 !px-3 flex-1">
            {t.common.viewDetails} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" search={{ product: product.slug }} className="btn btn-outline !py-2 !px-3 text-forest flex-1">
            {t.nav.inquire}
          </Link>
        </div>
      </div>
    </article>
  );
}
