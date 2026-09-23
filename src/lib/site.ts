export const site = {
  name: "Partyzubehör Buchert",
  owner: "Thorsten Demandewicz",
  street: "Schustergasse 10",
  zip: "55278",
  city: "Köngernheim",
  phoneDisplay: "+49 151 21675516",
  phoneHref: "tel:+4915121675516",
  email: "info@partyzubehoer-buchert.de",
  region: "Mainz und Umgebung",
  website: "https://www.partyzubehoer-buchert.de/",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.website,
  telephone: site.phoneDisplay,
  email: site.email,
  founder: { "@type": "Person", name: site.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    postalCode: site.zip,
    addressLocality: site.city,
    addressCountry: "DE",
  },
  areaServed: "Mainz und Umgebung",
  description:
    "Partyzubehör, Getränke und Veranstaltungsausstattung zum Mieten für private Feiern, Vereinsfeste und Veranstaltungen in Mainz und Umgebung.",
};

export type Fulfillment = "pickup-or-delivery" | "delivery-only";

export interface Product {
  id: string;
  name: string;
  variants?: string[];
  category: string;
  fulfillment: Fulfillment;
  note?: string;
}

export const categories = [
  { id: "moebel", name: "Garnituren & Stehtische" },
  { id: "hussen", name: "Hussen" },
  { id: "glaeser", name: "Gläser" },
  { id: "technik", name: "Zapfanlagen, Kühlung & Heizung" },
  { id: "zelte", name: "Zelte & Pavillons" },
  { id: "getraenke", name: "Getränke" },
] as const;

export const products: Product[] = [
  { id: "garnitur", name: "Bierzeltgarnituren", category: "moebel", fulfillment: "pickup-or-delivery" },
  { id: "stehtisch", name: "Stehtische", category: "moebel", fulfillment: "pickup-or-delivery" },
  { id: "husse-garnitur", name: "Hussen für Bierzeltgarnituren", category: "hussen", fulfillment: "pickup-or-delivery" },
  { id: "husse-stehtisch", name: "Hussen für Stehtische", category: "hussen", fulfillment: "pickup-or-delivery" },
  { id: "schnapsglas", name: "Schnapsglas", category: "glaeser", fulfillment: "pickup-or-delivery" },
  { id: "mehrzweckglas", name: "Mehrzweckglas", variants: ["0,2 l", "0,3 l"], category: "glaeser", fulfillment: "pickup-or-delivery" },
  { id: "schoppeglas", name: "Schoppeglas", variants: ["0,4 l"], category: "glaeser", fulfillment: "pickup-or-delivery" },
  { id: "sektglas", name: "Sektglas", category: "glaeser", fulfillment: "pickup-or-delivery" },
  { id: "weizenglas", name: "Weizenbierglas", variants: ["0,5 l"], category: "glaeser", fulfillment: "pickup-or-delivery" },
  { id: "bierglas", name: "Bierglas", variants: ["0,3 l"], category: "glaeser", fulfillment: "pickup-or-delivery" },
  { id: "zapfanlage", name: "Bierzapfanlage", variants: ["1-leitig", "2-leitig"], category: "technik", fulfillment: "pickup-or-delivery" },
  { id: "kuehlschrank", name: "Kühlschrank", category: "technik", fulfillment: "pickup-or-delivery" },
  { id: "kuehlwagen", name: "Kühlwagen", variants: ["Mo–Do", "Fr–So"], category: "technik", fulfillment: "pickup-or-delivery" },
  { id: "heizpilz", name: "Heizpilz", variants: ["ohne Gas"], category: "technik", fulfillment: "pickup-or-delivery" },
  { id: "pavillon", name: "Pavillon", variants: ["ohne Seitenwände"], category: "zelte", fulfillment: "pickup-or-delivery" },
  {
    id: "partyzelt",
    name: "Partyzelt",
    variants: ["4 × 6 m", "4 × 8 m", "4 × 10 m"],
    category: "zelte",
    fulfillment: "delivery-only",
    note: "Inklusive Lieferung, Auf- und Abbau. Keine Selbstabholung, kein Selbstaufbau.",
  },
  { id: "getraenke", name: "Getränke", variants: ["verschiedene Sorten"], category: "getraenke", fulfillment: "pickup-or-delivery" },
];

export const eventTypes = [
  "Geburtstag",
  "Hochzeit",
  "Vereinsfest",
  "Firmenfeier",
  "Gartenparty",
  "Sonstige Veranstaltung",
];

export const guestRanges = ["bis 30", "30–60", "60–100", "100–200", "über 200"];