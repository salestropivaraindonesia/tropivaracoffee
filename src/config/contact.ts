// Central contact configuration. Update WHATSAPP_NUMBER once the real business
// number is confirmed (digits only, international format, e.g. "628123456789").
// While empty, WhatsApp buttons display a "number coming soon" state instead of a fake link.
export const WHATSAPP_NUMBER = "6285196572911";
export const WHATSAPP_DISPLAY = "+62 851 9657 2911";
export const BUSINESS_EMAIL = "salestropivaraindonesia@gmail.com";
export const SECONDARY_EMAIL = "sales@tropivaraindo.biz.id";
export const SOCIALS = {
  instagram: { label: "@tropivaraindonesia", url: "https://www.instagram.com/tropivaraindonesia/?utm_source=ig_web_button_share_sheet" },
  facebook: { label: "Tropivara Indonesia", url: "https://web.facebook.com/tropivaraindonesia" },
  linkedin: { label: "Tropivara Indonesia", url: "https://www.linkedin.com/in/tropivara-indonesia-3726a8440" },
};
export const WEBSITE_URL = "https://tropivaraindo.biz.id";

export const hasWhatsApp = () => /^\d{8,15}$/.test(WHATSAPP_NUMBER);

export function whatsappLink(message: string) {
  if (!hasWhatsApp()) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body = "") {
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${BUSINESS_EMAIL}?${q}`;
}
