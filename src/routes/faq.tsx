import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const title = "Häufige Fragen | Partyzubehör Buchert";
const description =
  "Antworten zu Abholung, Lieferung, Partyzelten, Angebot und Ablauf beim Partyverleih Buchert in Köngernheim.";

const faqs = [
  {
    q: "Kann ich die Artikel selbst abholen?",
    a: `Ja. Alle Artikel außer Partyzelte kannst du bei uns in der ${site.street}, ${site.zip} ${site.city} abholen.`,
  },
  {
    q: "Liefert ihr auch?",
    a: "Ja, alle Artikel sind auch lieferbar. Die Lieferung bieten wir mit einem individuellen Lieferangebot an – abhängig von Umfang und Lieferort.",
  },
  {
    q: "Kann ich ein Partyzelt selbst abholen oder aufbauen?",
    a: "Nein. Partyzelte (4×6 m, 4×8 m, 4×10 m) beinhalten immer Lieferung sowie Auf- und Abbau durch uns. Selbstabholung oder Selbstaufbau sind nicht möglich.",
  },
  {
    q: "Wie erhalte ich ein Angebot?",
    a: "Stelle deine Feier im Veranstaltungsplaner zusammen oder ruf uns direkt an. Du erhältst ein persönliches Angebot – es gibt keine automatische Preisberechnung.",
  },
  {
    q: "Welche Getränke gibt es?",
    a: "Wir bieten Getränke in verschiedenen Sorten an. Sag uns einfach, was du dir für deine Feier wünschst – wir beraten dich gern.",
  },
  {
    q: "Für welche Region bietet ihr euren Service an?",
    a: `Wir sind in ${site.city} zu Hause und versorgen private Feiern, Vereinsfeste und Veranstaltungen in ${site.region}.`,
  },
  {
    q: "Was bedeutet Kühlwagen Mo–Do bzw. Fr–So?",
    a: "Den Kühlwagen vermieten wir in zwei Zeiträumen: Montag bis Donnerstag oder Freitag bis Sonntag. Welcher Zeitraum passt, klären wir mit dir im Angebot.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground lg:py-32">
        <div className="container-site">
          <p className="eyebrow">FAQ</p>
          <h1 className="headline mt-4 text-5xl lg:text-7xl">Häufige Fragen.</h1>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="divide-y divide-border">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`f-${i}`} className="border-b-0">
                  <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-lg bg-ink p-8 text-ink-foreground shadow-soft">
              <p className="eyebrow">Noch Fragen?</p>
              <h2 className="headline mt-3 text-2xl">Wir helfen persönlich weiter.</h2>
              <p className="mt-3 text-sm text-ink-muted">{site.owner}</p>
              <a href={site.phoneHref} className="mt-1 block text-sm hover:text-gold">{site.phoneDisplay}</a>
              <Button asChild variant="gold" size="lg" className="mt-6 w-full">
                <Link to="/planer">
                  Feier planen <ArrowRight />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}