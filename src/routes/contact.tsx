import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Globe, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import headerContact from "@/assets/header-contact.jpg";
import { PageHeader } from "@/components/site/Layout";
import { getProduct, productLabel, products } from "@/data/products";
import { BUSINESS_EMAIL, SECONDARY_EMAIL, SOCIALS, WHATSAPP_DISPLAY, WEBSITE_URL, mailtoLink, whatsappLink } from "@/config/contact";
import { validateInquiry, type InquiryErrors, type InquiryInput } from "@/lib/inquiry";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { product?: string } => (typeof s["product"] === "string" ? { product: s["product"] as string } : {}),
  head: () => ({
    meta: [
      { title: "Contact & Inquiries — Tropivara Green Coffee" },
      { name: "description", content: "Send a B2B inquiry about Tropivara green coffee: samples, availability and supply arrangements." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tropivaraindocoffee.lovable.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Contact Tropivara" },
      { property: "og:description", content: "Inquire about Indonesian green coffee for your roastery or business." },
    ],
    links: [{ rel: "canonical", href: "https://tropivaraindocoffee.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const { product } = Route.useSearch();
  const preset = product ? getProduct(product) : undefined;
  const [v, setV] = useState<InquiryInput>({ name: "", company: "", email: "", product: preset ? productLabel(preset) : "", message: "" });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ready" | "error">("idle");
  const [summary, setSummary] = useState("");
  const errRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => { if (preset) setV((x) => ({ ...x, product: productLabel(preset) })); }, [preset]);

  const body = `${c.greeting}\n\n${c.name}: ${v.name}\n${c.company}: ${v.company}\n${c.email}: ${v.email}\n${c.product}: ${v.product}\n\n${v.message}`;
  const subject = `${c.subject}: ${v.product} — ${v.company}`;
  const wa = whatsappLink(body);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const errs = validateInquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) { setTimeout(() => errRef.current?.focus(), 0); return; }
    setStatus("submitting");
    setSummary(body);
    try {
      window.location.href = mailtoLink(subject, body);
      setTimeout(() => setStatus("ready"), 600);
    } catch {
      setStatus("error");
    }
  };

  const field = (k: keyof InquiryInput, label: string, type = "text", auto?: string) => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm font-medium">{label} <span aria-hidden="true" className="text-destructive">*</span></label>
      <input id={k} name={k} type={type} autoComplete={auto} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} required className="field" />
      {errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{c[errors[k]!]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader image={headerContact} eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="container-page grid items-start gap-14 py-16 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-10">
          <div>
            <h2 className="text-2xl text-forest-deep">{c.stepsT}</h2>
            <ol className="mt-5 space-y-4">
              {c.steps.map((s, i) => <li key={s} className="grid grid-cols-[2rem_1fr] gap-3 text-muted-foreground"><span className="font-display text-coffee">0{i + 1}</span>{s}</li>)}
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">{c.stepsNote}</p>
          </div>
        </aside>

        <div className="self-start border border-border bg-card p-6 md:p-10">
          <h2 className="text-3xl text-forest-deep">{c.formT}</h2>
          {status === "ready" ? (
            <div role="status" className="mt-6 space-y-5">
              <CheckCircle2 className="h-8 w-8 text-forest" />
              <h3 className="text-2xl">{c.successT}</h3>
              <p className="text-muted-foreground">{c.success}</p>
              <p className="text-sm">{c.fallback} <a className="text-forest underline" href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>:</p>
              <pre className="max-h-60 overflow-auto whitespace-pre-wrap bg-muted p-4 text-xs">{summary}</pre>
              <div className="flex flex-wrap gap-3">
                {wa && <a href={wa} target="_blank" rel="noreferrer" className="btn btn-outline text-forest"><MessageCircle className="h-4 w-4" /> {c.sendWa}</a>}
                <button type="button" className="btn btn-primary" onClick={() => { setStatus("idle"); setV({ name: "", company: "", email: "", product: "", message: "" }); }}>{c.another}</button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
              {Object.keys(errors).length > 0 && <p ref={errRef} tabIndex={-1} role="alert" className="bg-destructive/10 p-3 text-sm text-destructive">{c.fixErrors}</p>}
              {status === "error" && <p role="alert" className="bg-destructive/10 p-3 text-sm text-destructive">{c.error} {BUSINESS_EMAIL}</p>}
              <div className="grid gap-5 sm:grid-cols-2">
                {field("name", c.name, "text", "name")}
                {field("company", c.company, "text", "organization")}
              </div>
              {field("email", c.email, "email", "email")}
              <div>
                <label htmlFor="product" className="mb-1.5 block text-sm font-medium">{c.product} <span aria-hidden="true" className="text-destructive">*</span></label>
                <input id="product" list="product-list" value={v.product} placeholder={c.productPh} onChange={(e) => setV({ ...v, product: e.target.value })}
                  aria-invalid={!!errors.product} aria-describedby={errors.product ? "product-err" : undefined} className="field" />
                <datalist id="product-list">{products.map((p) => <option key={p.slug} value={productLabel(p)} />)}</datalist>
                {errors.product && <p id="product-err" className="mt-1 text-sm text-destructive">{c[errors.product]}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">{c.message} <span aria-hidden="true" className="text-destructive">*</span></label>
                <textarea id="message" rows={6} value={v.message} placeholder={c.messagePh} onChange={(e) => setV({ ...v, message: e.target.value })}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className="field" />
                {errors.message && <p id="message-err" className="mt-1 text-sm text-destructive">{c[errors.message]}</p>}
              </div>
              <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto">{status === "submitting" ? c.submitting : c.submit}</button>
              <p className="text-xs text-muted-foreground">{c.formNote}</p>
            </form>
          )}
        </div>
      </section>
      <div className="border-t border-border bg-secondary/50"><div className="container-page py-16">
          <section className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl text-forest-deep">{c.includeT}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">{c.include.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="mt-4 text-sm text-muted-foreground">{c.includeNote}</p>
            <p className="mt-2 text-sm text-muted-foreground">{c.availability}</p>
          </section>
      </div></div>
      <div className="border-t border-border"><div className="container-page py-16">
          <section className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl text-forest-deep">{c.direct}</h2>
            <div className="mt-4 flex flex-col gap-3">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="btn btn-outline justify-start text-forest"><Mail className="h-4 w-4" /> <span className="break-all">{BUSINESS_EMAIL}</span></a>
              <a href={`mailto:${SECONDARY_EMAIL}`} className="btn btn-outline justify-start text-forest"><Mail className="h-4 w-4" /> <span className="break-all">{SECONDARY_EMAIL}</span></a>
              <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="btn btn-outline justify-start text-forest"><Globe className="h-4 w-4" /> {c.website}: {WEBSITE_URL.replace("https://", "")}</a>
              {whatsappLink("Hello Tropivara") ? (
                <a href={whatsappLink(`${c.greeting}`)!} target="_blank" rel="noreferrer" className="btn btn-outline justify-start text-forest"><MessageCircle className="h-4 w-4" /> WhatsApp {WHATSAPP_DISPLAY}</a>
              ) : (
                <span aria-disabled="true" className="btn btn-outline justify-start text-muted-foreground"><MessageCircle className="h-4 w-4" /> {t.common.whatsappSoon}</span>
              )}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>Instagram: <a href={SOCIALS.instagram.url} target="_blank" rel="noreferrer" className="text-forest underline">{SOCIALS.instagram.label}</a></li>
              <li>Facebook: <a href={SOCIALS.facebook.url} target="_blank" rel="noreferrer" className="text-forest underline">{SOCIALS.facebook.label}</a></li>
              <li>LinkedIn: <a href={SOCIALS.linkedin.url} target="_blank" rel="noreferrer" className="text-forest underline">{SOCIALS.linkedin.label}</a></li>
              <li>{c.address}</li>
            </ul>
          </section>
      </div></div>
      <section className="border-t border-border bg-secondary/50">
        <div className="container-page py-16">
          <h2 className="text-center text-3xl text-forest-deep">{c.faqT}</h2>
          <dl className="mt-8 grid gap-px bg-border md:grid-cols-2">
            {c.faq.map((f) => (
              <div key={f.q} className="bg-background p-6"><dt className="font-medium text-forest-deep">{f.q}</dt><dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd></div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
