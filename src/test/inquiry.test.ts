import { describe, expect, it } from "vitest";
import { validateInquiry } from "@/lib/inquiry";
import { products } from "@/data/products";
import { BUSINESS_EMAIL, SOCIALS, whatsappLink } from "@/config/contact";

const ok = { name: "A", company: "B", email: "a@b.co", product: "Excelsa Grade 1", message: "Need 2 tons monthly" };

describe("inquiry rules", () => {
  it("requires all fields", () => {
    expect(Object.keys(validateInquiry({ name: "", company: "", email: "", product: "", message: "" }))).toHaveLength(5);
  });
  it("rejects invalid email", () => {
    expect(validateInquiry({ ...ok, email: "abc" }).email).toBe("invalidEmail");
  });
  it("accepts a valid inquiry", () => {
    expect(validateInquiry(ok)).toEqual({});
  });
  it("uses the business email", () => {
    expect(BUSINESS_EMAIL).toBe("salestropivaraindonesia@gmail.com");
  });
  it("WhatsApp links use the official number", () => {
    expect(whatsappLink("hi")).toBe("https://wa.me/6285196572911?text=hi");
  });
  it("social links point at the official profiles", () => {
    expect(SOCIALS.instagram.url).toBe("https://www.instagram.com/tropivaraindonesia/?utm_source=ig_web_button_share_sheet");
    expect(SOCIALS.facebook.url).toBe("https://web.facebook.com/tropivaraindonesia");
    expect(SOCIALS.linkedin.url).toBe("https://www.linkedin.com/in/tropivara-indonesia-3726a8440");
  });
  it("catalog has 15 products across 8 origins with no price field", () => {
    expect(products).toHaveLength(15);
    expect(new Set(products.map((p) => p.originId)).size).toBe(8);
    expect(products.some((p) => "price" in p)).toBe(false);
  });
});
