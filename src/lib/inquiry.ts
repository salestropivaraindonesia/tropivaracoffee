export interface InquiryInput { name: string; company: string; email: string; product: string; message: string }
export type InquiryErrors = Partial<Record<keyof InquiryInput, "required" | "invalidEmail" | "tooShort">>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v: InquiryInput): InquiryErrors {
  const e: InquiryErrors = {};
  (["name", "company", "email", "product", "message"] as const).forEach((k) => {
    if (!v[k].trim()) e[k] = "required";
  });
  if (!e.email && !EMAIL_RE.test(v.email.trim())) e.email = "invalidEmail";
  if (!e.message && v.message.trim().length < 10) e.message = "tooShort";
  return e;
}
