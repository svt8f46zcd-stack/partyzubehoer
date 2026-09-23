import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PackageCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/site";

const title = "Ausstattung mieten – Garnituren, Gläser, Zapfanlagen, Zelte | Partyzubehör Buchert";
const description =
  "Komplettes Verleihsortiment: Bierzeltgarnituren, Stehtische, Hussen, Gläser, Bierzapfanlagen, Kühlwagen, Heizpilze, Pavillons, Partyzelte und Getränke. Selbstabholung in Köngernheim oder Lieferung.";

export const Route = createFileRoute("/ausstattung")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ausstattung" },
    ],
    links: [{ rel: "canonical", href: "/ausstattung" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src="https://images.pexels.com/photos/9703892/pexels-photo-9703892.jpeg?cs=srgb&dl=pexels-jonathanborba-9703892.jpg&fm=jpg"
          alt="Stehtische und Bierzeltgarnituren mit weißen Hussen"
          width={1000}
          height={667}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-site relative py-24 lg:py-36">
          <p className="eyebrow">Sortiment</p>
          <h1 className="headline mt-4 max-w-3xl text-5xl lg:text-7xl">Ausstattung mieten.</h1>
          <p className="mt-6 max-w-xl text-ink-muted">
            Alle Preise auf Anfrage. Alle Artikel außer Partyzelte zur Selbstabholung in
            Köngernheim – jeder Artikel auf Wunsch auch mit individuellem Lieferangebot.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container-site grid gap-px bg-border sm:grid-cols-2">
          <div className="flex gap-4 bg-background p-6">
            <PackageCheck className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Selbstabholung</strong> – Schustergasse 10,
              55278 Köngernheim (alle Artikel außer Partyzelte).
            </p>
          </div>
          <div className="flex gap-4 bg-background p-6">
            <Truck className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Lieferung</strong> – für alle Artikel möglich,
              Partyzelte inklusive Auf- und Abbau.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site space-y-20">
          {categories.map((cat) => {
            const items = products.filter((p) => p.category === cat.id);
            return (
              <div key={cat.id} id={cat.id} className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="gold-rule" />
                  <h2 className="headline mt-4 text-3xl lg:text-4xl">{cat.name}</h2>
                </div>
                <ul className="divide-y divide-border lg:col-span-8">
                  {items.map((p) => (
                    <li key={p.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{p.name}</h3>
                        {p.variants && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {p.variants.map((v) => (
                              <span key={v} className="rounded-sm border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground">
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
                        {p.note && <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>}
                      </div>
                      <span className={`shrink-0 text-xs font-semibold uppercase tracking-[0.18em] ${p.fulfillment === "delivery-only" ? "text-gold" : "text-muted-foreground"}`}>
                        {p.fulfillment === "delivery-only" ? "Nur mit Lieferung & Aufbau" : "Abholung oder Lieferung"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-ink py-20 text-ink-foreground">
        <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="headline text-3xl lg:text-5xl">Zusammenstellen und unverbindlich anfragen.</h2>
          <Button asChild variant="gold" size="xl">
            <Link to="/planer">
              Feier planen <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}