import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

export function InquiryCta() {
  const { t } = useI18n();
  return (
    <section className="bg-forest text-forest-foreground">
      <div className="container-page flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl">{t.home.ctaTitle}</h2>
          <p className="mt-4 text-forest-foreground/90">{t.home.ctaBody}</p>
        </div>
        <Link to="/contact" className="btn btn-ivory shrink-0">{t.nav.inquire} <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
