import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/LanguageProvider";
import headerQuality from "@/assets/header-quality.jpg";
import { PageHeader } from "@/components/site/Layout";
import { InquiryCta } from "@/components/site/InquiryCta";
import beds from "@/assets/coffee-harvest-photo.jpg.asset.json";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Processing & Quality Control — Tropivara" },
      { name: "description", content: "Processing methods and grading data for Tropivara green coffee lots, with our step-by-step quality control process." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tropivaraindocoffee.lovable.app/quality" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Processing & Quality — Tropivara" },
      { property: "og:description", content: "Natural, pulp honey, anaerob and fully washed lots with documented moisture, screen and defect data." },
    ],
    links: [{ rel: "canonical", href: "https://tropivaraindocoffee.lovable.app/quality" }],
  }),
  component: Quality,
});

function Quality() {
  const { t } = useI18n();
  const q = t.quality;
  return (
    <>
      <PageHeader image={headerQuality} eyebrow={q.eyebrow} title={q.title} lead={q.lead} />
      <section className="container-page py-20">
        <h2 className="text-center text-3xl text-forest-deep">{q.confirmedT}</h2>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
          {q.confirmed.map((c) => <div key={c.t} className="bg-background p-7"><h3 className="text-xl text-forest-deep">{c.t}</h3><p className="mt-2 text-muted-foreground">{c.d}</p></div>)}
        </div>
      </section>
      <section className="border-y border-border bg-secondary/50">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr]">
          <img src={beds.url} alt="Coffee cherries drying after harvest" loading="lazy" width={1200} height={1200} className="aspect-square w-full object-cover" />
          <div>
            <h2 className="text-3xl text-forest-deep">{q.methodsT}</h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {q.methods.map((m) => <div key={m.t} className="py-4"><dt className="font-display text-xl text-forest-deep">{m.t}</dt><dd className="mt-1 text-muted-foreground">{m.d}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>
      <section className="container-page py-20">
        <h2 className="text-center text-3xl text-forest-deep">{q.qcT}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">{q.qcLead}</p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {q.qc.map((step, i) => {
            const last = i === q.qc.length - 1;
            return (
              <li key={step.t} className={`border border-border bg-background p-7 ${last ? "mx-auto w-full sm:col-span-2 sm:max-w-sm lg:col-span-1 lg:col-start-2 lg:max-w-none" : ""}`}>
                <span aria-hidden="true" className="block text-center font-display text-3xl text-coffee">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl text-forest-deep">{step.t}</h3>
                <p className="mt-2 text-muted-foreground">{step.d}</p>
              </li>
            );
          })}
        </ol>
      </section>
      <section className="border-t border-border">
        <div className="container-page py-20 max-w-3xl">
          <h2 className="text-center text-3xl text-forest-deep">{q.infoT}</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-muted-foreground">{q.info.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </section>
      <InquiryCta />
    </>
  );
}
