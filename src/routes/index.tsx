import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Truck, PackageCheck, Tent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const title = "Partyzubehör Buchert – Partyverleih für Mainz & Umgebung";
const description =
  "Partyzubehör, Getränke und Veranstaltungsausstattung aus einer Hand: Garnituren, Stehtische, Gläser, Zapfanlagen, Kühlwagen und Partyzelte für Feiern in Mainz und Umgebung.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const pillars = [
  {
    icon: PackageCheck,
    title: "Selbstabholung in Köngernheim",
    text: "Alle Artikel außer Partyzelte holst du bequem bei uns in der Schustergasse ab.",
  },
  {
    icon: Truck,
    title: "Lieferung nach individuellem Angebot",
    text: "Jeder Artikel ist auch lieferbar – wir erstellen dir ein persönliches Lieferangebot.",
  },
  {
    icon: Tent,
    title: "Partyzelte inklusive Auf- & Abbau",
    text: "Zelte in 4×6, 4×8 und 4×10 m liefern wir und bauen sie fachgerecht auf und wieder ab.",
  },
];

const imageUrls = {
  hero: "https://images.pexels.com/photos/37958132/pexels-photo-37958132.jpeg?cs=srgb&dl=pexels-jonathanborba-37958132.jpg&fm=jpg",
  moebel: "https://images.pexels.com/photos/9703892/pexels-photo-9703892.jpeg?cs=srgb&dl=pexels-jonathanborba-9703892.jpg&fm=jpg",
  getraenke: "https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?cs=srgb&dl=pexels-bohlemedia-1089930.jpg&fm=jpg",
  zelt: "https://images.pexels.com/photos/4993952/pexels-photo-4993952.jpeg?cs=srgb&dl=pexels-anastasia-shuraeva-4993952.jpg&fm=jpg",
};

const showcase = [
  { img: imageUrls.moebel, label: "Möbel & Hussen", title: "Garnituren, Stehtische, Hussen", w: 1000, h: 667 },
  { img: imageUrls.getraenke, label: "Getränke & Ausschank", title: "Zapfanlagen, Gläser, Kühlung", w: 667, h: 1000 },
  { img: imageUrls.zelt, label: "Zelte & Wetterschutz", title: "Partyzelte, Pavillons, Heizpilze", w: 667, h: 1000 },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-ink-foreground">
        <img
          src={imageUrls.hero}
          alt="Festlich eingedeckte Bierzeltgarnituren mit weißen Hussen bei Abendlicht"
          width={1000}
          height={667}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-site relative flex min-h-[92svh] flex-col justify-end pb-16 pt-24 lg:pb-24">
          <p className="eyebrow">Partyverleih · Köngernheim · {site.region}</p>
          <h1 className="headline mt-6 max-w-5xl text-[2.75rem] sm:text-6xl lg:text-8xl">
            Deine Feier.
            <br />
            Wir kümmern uns um den Rest.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Partyzubehör, Getränke und Veranstaltungsausstattung aus einer Hand – für private
            Feiern, Vereinsfeste und Veranstaltungen in Mainz und Umgebung.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/planer">
                Feier planen <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <a href={site.phoneHref}>
                <Phone /> Direkt anrufen
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-border bg-background">
        <div className="container-site grid gap-px overflow-hidden bg-border sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="bg-background p-8 lg:p-12">
              <p.icon className="size-6 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 text-xl font-medium">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="py-20 lg:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Ausstattung</p>
              <h2 className="headline mt-4 text-4xl lg:text-6xl">
                Alles, was eine gute Feier braucht.
              </h2>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/ausstattung">
                Komplettes Sortiment <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {showcase.map((s, i) => (
              <Link
                key={s.title}
                to="/ausstattung"
                className={`group relative overflow-hidden rounded-lg bg-ink shadow-soft ${i === 1 ? "md:translate-y-10" : ""}`}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  width={s.w}
                  height={s.h}
                  decoding="async"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="hero-overlay absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                  <p className="eyebrow">{s.label}</p>
                  <h3 className="mt-2 font-display text-2xl">{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="grain bg-ink py-20 text-ink-foreground lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">So läuft's</p>
            <h2 className="headline mt-4 text-4xl lg:text-6xl">In drei Schritten zur Feier.</h2>
            <p className="mt-6 max-w-md text-ink-muted">
              Kein Warenkorb, keine automatische Preisberechnung – sondern ein persönliches Angebot,
              das zu deiner Veranstaltung passt.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-8">
              <Link to="/planer">
                Anfrage starten <ArrowRight />
              </Link>
            </Button>
          </div>
          <ol className="space-y-10 lg:col-span-7 lg:pl-12">
            {[
              ["01", "Feier planen", "Veranstaltungstyp, Gästezahl und gewünschte Ausstattung im Planer zusammenstellen."],
              ["02", "Angebot erhalten", "Wir melden uns persönlich mit einem individuellen Angebot – inklusive Lieferoption, falls gewünscht."],
              ["03", "Abholen oder liefern lassen", "Du holst in Köngernheim ab oder wir liefern. Partyzelte bauen wir für dich auf und ab."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-6 border-t border-ink-border pt-6">
                <span className="font-display text-3xl text-gold">{n}</span>
                <div>
                  <h3 className="text-xl font-medium">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="py-20 lg:py-28">
        <div className="container-site flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Persönlich erreichbar</p>
            <h2 className="headline mt-4 text-3xl lg:text-5xl">
              Lieber kurz sprechen? {site.owner} hilft dir weiter.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="default" size="xl">
              <a href={site.phoneHref}>
                <Phone /> {site.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/kontakt">Kontaktseite</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}