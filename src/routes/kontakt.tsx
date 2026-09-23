import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

const title = "Kontakt | Partyzubehör Buchert, Köngernheim";
const description = `Partyzubehör Buchert, ${site.owner}, ${site.street}, ${site.zip} ${site.city}. Telefon ${site.phoneDisplay}.`;

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Page,
});

function Page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Anfrage über die Website")}&body=${encodeURIComponent(
    `Name: ${form.name}\nE-Mail: ${form.email}\nTelefon: ${form.phone}\n\n${form.message}`,
  )}`;

  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground lg:py-32">
        <div className="container-site">
          <p className="eyebrow">Kontakt</p>
          <h1 className="headline mt-4 text-5xl lg:text-7xl">Sprechen wir über deine Feier.</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <p className="eyebrow">Telefon</p>
                <a href={site.phoneHref} className="mt-1 block font-display text-2xl hover:text-gold">
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <p className="eyebrow">E-Mail</p>
                <a href={`mailto:${site.email}`} className="mt-1 block font-display text-2xl break-all hover:text-gold">
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
              <address className="not-italic">
                <p className="eyebrow">Adresse &amp; Abholung</p>
                <p className="mt-1 font-display text-2xl">{site.name}</p>
                <p className="text-muted-foreground">{site.owner}</p>
                <p className="text-muted-foreground">{site.street}</p>
                <p className="text-muted-foreground">{site.zip} {site.city}</p>
              </address>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Du möchtest gleich Ausstattung, Gästezahl und Termin mitteilen? Nutze den
                Veranstaltungsplaner – das macht das Angebot schneller.
              </p>
              <Button asChild variant="outline" size="lg" className="mt-4">
                <Link to="/planer">
                  Zum Planer <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <form
            className="space-y-5 rounded-lg bg-card p-8 shadow-soft lg:col-span-7"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
          >
            <p className="eyebrow">Nachricht senden</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Deine Nachricht</Label>
              <Textarea id="message" rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button type="submit" variant="gold" size="xl" className="w-full sm:w-auto">
              Per E-Mail senden <ArrowRight />
            </Button>
            <p className="text-xs text-muted-foreground">
              Öffnet dein E-Mail-Programm mit der vorbereiteten Nachricht an {site.email}.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}