import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { BUSINESS_EMAIL, SECONDARY_EMAIL, WHATSAPP_DISPLAY, hasWhatsApp, whatsappLink } from "@/config/contact";
import type { Lang } from "@/i18n/translations";
import logo from "@/assets/tropivara-logo-clean.png.asset.json";
import logoLight from "@/assets/tropivara-logo-light-clean.png.asset.json";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <img src={light ? logoLight.url : logo.url} alt="Tropivara Indonesia" width={1152} height={928} className={light ? "h-auto w-48" : "h-16 w-auto"} />
  );
}

function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.language} className="flex rounded-sm border border-forest/25 text-xs font-semibold">
      {(["en", "id"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`px-2.5 py-1.5 uppercase tracking-wider transition-colors ${lang === l ? "bg-forest text-forest-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l === "en" ? "EN" : "ID"}
        </button>
      ))}
    </div>
  );
}

const navItems = ["home", "about", "products", "origins", "quality", "contact"] as const;
const paths = { home: "/", about: "/about", products: "/products", origins: "/origins", quality: "/quality", contact: "/contact" } as const;

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div aria-hidden="true" className="h-1.5 w-full bg-forest" />
      <div className="container-page flex h-24 items-center justify-between gap-4">
        <Link to="/" aria-label="Tropivara — home" onClick={() => setOpen(false)}><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navItems.map((k) => (
            <Link key={k} to={paths[k]} activeOptions={{ exact: k === "home" }} className="text-sm text-forest-deep/80 hover:text-forest" activeProps={{ className: "text-forest font-semibold underline decoration-forest/40 underline-offset-8" }}>
              {t.nav[k]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link to="/contact" className="btn btn-primary hidden md:inline-flex !py-2">{t.nav.inquire}</Link>
          <button type="button" className="lg:hidden p-2" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border lg:hidden">
          <div className="container-page flex flex-col py-3">
            {navItems.map((k) => (
              <Link key={k} to={paths[k]} onClick={() => setOpen(false)} className="py-3 font-display text-xl border-b border-border/60 last:border-0">
                {t.nav[k]}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  const wa = whatsappLink("Hello Tropivara");
  return (
    <footer className="site-footer bg-forest-deep text-forest-foreground">
      <div aria-hidden="true" className="h-1.5 w-full bg-forest" />
      <div className="container-page grid gap-10 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4 max-w-sm">
          <Logo light />
          <p className="text-sm text-forest-foreground/85">{t.footer.tagline}</p>
          <p className="font-display italic text-accent">"{t.home.quote}"</p>
        </div>
        <div>
          <h2 className="eyebrow !text-accent mb-4">{t.footer.pages}</h2>
          <ul className="space-y-2 text-sm">
            {navItems.map((k) => (
              <li key={k}><Link to={paths[k]} className="hover:underline">{t.nav[k]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow !text-accent mb-4">{t.footer.contact}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${BUSINESS_EMAIL}`} className="hover:underline break-all">{BUSINESS_EMAIL}</a></li>
            <li><a href={`mailto:${SECONDARY_EMAIL}`} className="hover:underline break-all">{SECONDARY_EMAIL}</a></li>
            <li>{hasWhatsApp() && wa ? <a href={wa} target="_blank" rel="noreferrer" className="hover:underline">WhatsApp {WHATSAPP_DISPLAY}</a> : <span className="text-forest-foreground/80">WhatsApp: {t.common.whatsappSoon}</span>}</li>
            <li className="text-forest-foreground/80">{t.contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-foreground/15">
        <div className="container-page py-5 text-xs text-forest-foreground/90">© {new Date().getFullYear()} Tropivara. {t.footer.rights}</div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 btn btn-primary">Skip to content</a>
      <Header />
      <main id="main" className="site-main flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead, image }: { eyebrow: string; title: string; lead?: string; image?: string }) {
  return (
    <section className="site-page-header relative isolate overflow-hidden border-b border-border bg-forest-deep text-forest-foreground">
      {image && <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest-deep/75" />
      <div className="container-page flex flex-col items-center py-20 text-center md:py-28">
        <p className="eyebrow !text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg text-forest-foreground/90 [text-align-last:center]" style={{ textAlign: "justify" }}>{lead}</p>}
      </div>
    </section>
  );
}
