// Product data transcribed from "Tropivara Company Profile and Product Catalogue (EN v7)".
// Prices are intentionally omitted (quotations only). Only fields present in the catalogue are listed;
// a missing field means the catalogue does not list it for that product.
import type { Lang } from "@/i18n/translations";
import tv01 from "@/assets/tv-01.jpg.asset.json";
import tv02 from "@/assets/tv-02.jpg.asset.json";
import tv03 from "@/assets/tv-03.jpg.asset.json";
import tv04 from "@/assets/tv-04.jpg.asset.json";
import tv05 from "@/assets/tv-05.jpg.asset.json";
import tv06 from "@/assets/tv-06.jpg.asset.json";
import tv07 from "@/assets/tv-07.jpg.asset.json";
import tv08 from "@/assets/tv-08.jpg.asset.json";
import tv09 from "@/assets/tv-09.jpg.asset.json";
import tv10 from "@/assets/tv-10.jpg.asset.json";
import tv11 from "@/assets/tv-11.jpg.asset.json";
import tv12 from "@/assets/tv-12.jpg.asset.json";
import tv13 from "@/assets/tv-13.jpg.asset.json";
import tv14 from "@/assets/tv-14.jpg.asset.json";
import tv15 from "@/assets/tv-15.jpg.asset.json";

// Real green-coffee photographs taken from the catalogue PDF, keyed by catalogue reference.
const productImages: Record<string, string> = {
  "TV-01": tv01.url, "TV-02": tv02.url, "TV-03": tv03.url, "TV-04": tv04.url, "TV-05": tv05.url,
  "TV-06": tv06.url, "TV-07": tv07.url, "TV-08": tv08.url, "TV-09": tv09.url, "TV-10": tv10.url,
  "TV-11": tv11.url, "TV-12": tv12.url, "TV-13": tv13.url, "TV-14": tv14.url, "TV-15": tv15.url,
};

type L = Record<Lang, string>;
export type Species = "excelsa" | "arabica" | "robusta";

export interface Origin {
  id: string;
  title: string;
  location: string;
  species: Species;
  speciesLabel: string;
  altitude?: string;
}

export interface Product {
  slug: string;
  ref: string; // catalogue reference, e.g. "TV-01"
  name: string;
  originId: string;
  tags: string[];
  process: L;
  flavor?: L;
  grade?: string;
  screen?: string;
  moisture?: string;
  defects?: string;
  volume?: L;
  variety?: string;
  altitude?: string;
  acidity?: L;
}

export const origins: Origin[] = [
  { id: "wonosalam", title: "Wonosalam", location: "Jombang · East Java", species: "excelsa", speciesLabel: "Excelsa (Liberica var. Dewevrei)" },
  { id: "gayo", title: "Gayo Highlands", location: "Aceh · Sumatra", species: "arabica", speciesLabel: "Arabica", altitude: "1,200–1,600 masl" },
  { id: "ijen", title: "Ijen Highlands", location: "Banyuwangi · East Java", species: "arabica", speciesLabel: "Arabica", altitude: "1,200–1,500 masl" },
  { id: "flores", title: "Flores", location: "East Nusa Tenggara", species: "arabica", speciesLabel: "Arabica", altitude: "1,100+ masl" },
  { id: "arjuno", title: "Arjuno", location: "East Java", species: "arabica", speciesLabel: "Arabica", altitude: "Approx. 1,200–1,500 masl" },
  { id: "temanggung", title: "Temanggung", location: "Central Java", species: "robusta", speciesLabel: "Robusta" },
  { id: "dampit", title: "Dampit", location: "East Java", species: "robusta", speciesLabel: "Robusta" },
  { id: "pagar-alam", title: "Pagar Alam", location: "South Sumatra", species: "robusta", speciesLabel: "Robusta", altitude: "800–1,100 masl" },
];

const perSeason = (n: string): L => ({ en: `About ${n} tons each season`, id: `Sekitar ${n} ton per musim` });
const perMonth = (n: string): L => ({ en: `About ${n} tons a month`, id: `Sekitar ${n} ton per bulan` });
const perWeek = (n: string): L => ({ en: `About ${n} tons a week`, id: `Sekitar ${n} ton per minggu` });

export const products: Product[] = [
  {
    slug: "excelsa-hand-picked-red-cherry", ref: "TV-01", name: "Excelsa Hand-Picked Red Cherry", originId: "wonosalam",
    tags: ["Rare Variety", "Hand-Picked"],
    process: { en: "Pulp honey natural process using hand-picked ripe cherries", id: "Proses pulp honey natural dari ceri matang yang dipetik tangan" },
    flavor: { en: "Dried fruit and caramel, with cashew and jackfruit", id: "Buah kering dan karamel, dengan kacang mete dan nangka" },
    screen: "14–15", moisture: "10–12%", defects: "10 defect points", volume: perSeason("4"),
  },
  {
    slug: "excelsa-grade-1", ref: "TV-02", name: "Grade 1 Excelsa", originId: "wonosalam",
    tags: ["Rare Variety", "Pulp Honey"],
    process: { en: "Pulp honey natural process", id: "Proses pulp honey natural" },
    flavor: { en: "Jackfruit and blueberry, finishing with chocolate", id: "Nangka dan blueberry, dengan akhir rasa cokelat" },
    grade: "Grade 1", screen: "14–15", moisture: "10–12%", defects: "25 defect points", volume: perSeason("24"),
  },
  {
    slug: "excelsa-anaerobic-natural", ref: "TV-03", name: "Anaerobic Natural Excelsa", originId: "wonosalam",
    tags: ["Rare Variety", "Anaerobic"],
    process: { en: "Anaerobic natural process", id: "Proses natural anaerob" },
    flavor: { en: "Dark rum and prune alongside ripe jackfruit and cacao nibs", id: "Rum gelap dan prune bersama nangka matang dan cacao nibs" },
    screen: "14–15", moisture: "10–13%", defects: "25 defect points", volume: perSeason("5"),
  },
  {
    slug: "gayo-natural-grade-1", ref: "TV-04", name: "Grade 1 Natural Arabica", originId: "gayo",
    tags: ["Natural", "Single Origin"],
    process: { en: "Natural process, dried in the sun on raised beds", id: "Proses natural, dijemur matahari di para-para" },
    flavor: { en: "Tropical fruit with a syrupy body, dark chocolate and a herbal finish", id: "Buah tropis dengan body kental seperti sirup, cokelat hitam, dan akhir rasa herbal" },
    grade: "Grade 1", screen: "16+", moisture: "≤12%", defects: "≤11 defect points", volume: perMonth("20"),
  },
  {
    slug: "gayo-natural-commercial", ref: "TV-05", name: "Commercial Grade Natural Arabica", originId: "gayo",
    tags: ["Natural", "Single Origin"],
    process: { en: "Natural process, dried in the sun on raised beds", id: "Proses natural, dijemur matahari di para-para" },
    flavor: { en: "Dark chocolate with wet tobacco and cedar wood", id: "Cokelat hitam dengan tembakau basah dan kayu cedar" },
    grade: "Commercial grade", screen: "14+", moisture: "≤12%", defects: "≤80 defect points", volume: perMonth("20"),
  },
  {
    slug: "gayo-semi-washed", ref: "TV-06", name: "Semi-Washed Arabica", originId: "gayo",
    tags: ["Semi-Washed"],
    process: { en: "Semi-washed process", id: "Proses semi-washed" },
    flavor: { en: "Dark chocolate and nutty character with floral notes", id: "Karakter cokelat hitam dan nutty dengan sentuhan floral" },
    variety: "Ateng", altitude: "1,400+ masl",
  },
  {
    slug: "ijen-fully-washed-grade-1", ref: "TV-07", name: "Grade 1 Fully Washed Arabica", originId: "ijen",
    tags: ["Fully Washed"],
    process: { en: "Fully washed process", id: "Proses fully washed" },
    flavor: { en: "A clean, bright cup with citrus and bergamot", id: "Cangkir bersih dan cerah dengan sitrus dan bergamot" },
    grade: "Grade 1", screen: "16+", moisture: "≤12%", defects: "≤11 defect points", volume: perWeek("10"),
  },
  {
    slug: "ijen-natural-grade-1", ref: "TV-08", name: "Grade 1 Natural Arabica", originId: "ijen",
    tags: ["Natural"],
    process: { en: "Natural process", id: "Proses natural" },
    flavor: { en: "Citrus character with mild acidity", id: "Karakter sitrus dengan keasaman lembut" },
    grade: "Grade 1", screen: "16+", moisture: "≤12%", defects: "≤11 defect points", volume: perWeek("10"),
  },
  {
    slug: "flores-fully-washed", ref: "TV-09", name: "Fully Washed Arabica", originId: "flores",
    tags: ["Fully Washed"],
    process: { en: "Fully washed process", id: "Proses fully washed" },
    flavor: { en: "A light cup with mild acidity and floral, woody notes", id: "Cangkir ringan dengan keasaman lembut serta sentuhan floral dan kayu" },
    variety: "Typica, Lini S", altitude: "1,100+ masl",
  },
  {
    slug: "arjuno-natural-grade-1", ref: "TV-10", name: "Grade 1 Natural Arabica", originId: "arjuno",
    tags: ["Natural"],
    process: { en: "Natural process", id: "Proses natural" },
    flavor: { en: "Sweet and fruity, with caramel notes", id: "Manis dan fruity, dengan sentuhan karamel" },
    grade: "Grade 1", altitude: "Approx. 1,200–1,500 masl",
    acidity: { en: "Low to medium", id: "Rendah hingga sedang" },
    moisture: "12%", defects: "≤10%",
  },
  {
    slug: "temanggung-natural-grade-1", ref: "TV-11", name: "Grade 1 Natural Robusta", originId: "temanggung",
    tags: ["Natural", "Sorted"],
    process: { en: "Natural process, sorted", id: "Proses natural, disortir" },
    flavor: { en: "Earthy, with tobacco and dark cocoa notes and a heavy body", id: "Earthy, dengan sentuhan tembakau dan kakao gelap serta body tebal" },
    grade: "Grade 1", screen: "16", moisture: "≤13%", defects: "≤11 defect points", volume: perWeek("20"),
  },
  {
    slug: "temanggung-natural-grade-3", ref: "TV-12", name: "Grade 3 Natural Robusta", originId: "temanggung",
    tags: ["Natural", "Sorted"],
    process: { en: "Natural process, sorted", id: "Proses natural, disortir" },
    flavor: { en: "Bold dark cocoa and roasted peanut with earthy undertones and a heavy body", id: "Kakao gelap yang tegas dan kacang sangrai dengan nuansa earthy serta body tebal" },
    grade: "Grade 3", screen: "14–16", moisture: "≤13%", defects: "≤80 defect points", volume: perWeek("20"),
  },
  {
    slug: "dampit-natural-grade-1", ref: "TV-13", name: "Grade 1 Natural Robusta", originId: "dampit",
    tags: ["Natural"],
    process: { en: "Natural process", id: "Proses natural" },
    grade: "Grade 1",
    acidity: { en: "Low", id: "Rendah" },
    defects: "≤10%",
  },
  {
    slug: "pagar-alam-grade-1", ref: "TV-14", name: "Grade 1 Robusta", originId: "pagar-alam",
    tags: ["Natural", "Sorted"],
    process: { en: "Natural process, sorted", id: "Proses natural, disortir" },
    flavor: { en: "Bold and heavy-bodied, with dark chocolate and earthy notes", id: "Tegas dan ber-body tebal, dengan sentuhan cokelat hitam dan earthy" },
    grade: "Grade 1", screen: "16", moisture: "≤15%", defects: "≤11 defect points", volume: perWeek("10"),
  },
  {
    slug: "pagar-alam-commercial", ref: "TV-15", name: "Commercial Grade Robusta", originId: "pagar-alam",
    tags: ["Unsorted"],
    process: { en: "Natural process, unsorted", id: "Proses natural, tidak disortir" },
    flavor: { en: "Bold and earthy, with a lowland Robusta character", id: "Tegas dan earthy, dengan karakter robusta dataran rendah" },
    grade: "Commercial, ungraded", screen: "Mixed sizes", moisture: "15–18%", defects: "Mixed", volume: perWeek("20"),
  },
];

export const productImage = (p: Product) => productImages[p.ref];
export const getOrigin = (id: string) => origins.find((o) => o.id === id)!;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productLabel = (p: Product) => `${getOrigin(p.originId).title} — ${p.name}`;
