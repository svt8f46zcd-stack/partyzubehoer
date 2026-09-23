import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories, eventTypes, guestRanges, products, site } from "@/lib/site";

const title = "Veranstaltungsplaner – Feier in wenigen Schritten anfragen | Partyzubehör Buchert";
const description =
  "Veranstaltungstyp, Gästezahl und Ausstattung auswählen und unverbindlich anfragen. Persönliches Angebot ohne automatische Preisberechnung.";

export const Route = createFileRoute("/planer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/planer" },
    ],
    links: [{ rel: "canonical", href: "/planer" }],
  }),
  component: Planer,
});

const steps = ["Veranstaltungstyp", "Gästezahl", "Ausstattung", "PLZ & Ort", "Kontaktdaten", "Zusammenfassung"];

type Selection = Record<string, { qty: string; variant?: string | undefined }>;

interface State {
  eventType: string;
  guests: string;
  items: Selection;
  zip: string;
  city: string;
  date: string;
  delivery: "pickup" | "delivery" | "unsure";
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initial: State = {
  eventType: "",
  guests: "",
  items: {},
  zip: "",
  city: "",
  date: "",
  delivery: "unsure",
  name: "",
  email: "",
  phone: "",
  message: "",
};

function Planer() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(initial);
  const [sent, setSent] = useState(false);
  const patch = (p: Partial<State>) => setS((prev) => ({ ...prev, ...p }));

  const hasTent = Object.keys(s.items).includes("partyzelt");

  const canNext = [
    !!s.eventType,
    !!s.guests,
    Object.keys(s.items).length > 0,
    /^\d{5}$/.test(s.zip),
    !!s.name && /\S+@\S+\.\S+/.test(s.email),
    true,
  ][step];

  const summaryText = useMemo(() => {
    const lines = Object.entries(s.items).map(([id, v]) => {
      const p = products.find((x) => x.id === id)!;
      return `- ${p.name}${v.variant ? ` (${v.variant})` : ""}${v.qty ? ` × ${v.qty}` : ""}`;
    });
    const deliveryLabel = { pickup: "Selbstabholung", delivery: "Lieferung gewünscht", unsure: "noch offen" }[s.delivery];
    return [
      `Anfrage über den Veranstaltungsplaner`,
      ``,
      `Veranstaltung: ${s.eventType}`,
      `Gästezahl: ${s.guests}`,
      `Datum: ${s.date || "noch offen"}`,
      `Ort: ${s.zip} ${s.city}`.trim(),
      `Abholung/Lieferung: ${deliveryLabel}${hasTent ? " (Partyzelt: Lieferung inkl. Auf- und Abbau)" : ""}`,
      ``,
      `Gewünschte Ausstattung:`,
      ...lines,
      ``,
      `Kontakt:`,
      `${s.name}`,
      `${s.email}`,
      s.phone ? `${s.phone}` : "",
      ``,
      s.message ? `Anmerkungen:\n${s.message}` : "",
    ]
      .filter((l) => l !== undefined)
      .join("\n");
  }, [s, hasTent]);

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Anfrage: ${s.eventType} für ${s.guests} Gäste`)}&body=${encodeURIComponent(summaryText)}`;

  const toggleItem = (id: string) => {
    setS((prev) => {
      const items = { ...prev.items };
      if (items[id]) delete items[id];
      else {
        const p = products.find((x) => x.id === id)!;
        items[id] = { qty: "", variant: p.variants?.[0] };
      }
      return { ...prev, items };
    });
  };

  return (
    <>
      <section className="bg-ink py-16 text-ink-foreground lg:py-24">
        <div className="container-site">
          <p className="eyebrow">Veranstaltungsplaner</p>
          <h1 className="headline mt-4 text-4xl lg:text-6xl">Feier planen. Angebot erhalten.</h1>
          <p className="mt-4 max-w-xl text-ink-muted">
            Unverbindlich und ohne automatische Preisberechnung – du bekommst ein persönliches Angebot.
          </p>

          <ol className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {steps.map((label, i) => (
              <li key={label} className="text-xs">
                <div className={`h-0.5 ${i <= step ? "bg-gold" : "bg-ink-border"}`} />
                <p className={`mt-2 ${i === step ? "text-ink-foreground" : "text-ink-muted"}`}>
                  <span className="text-gold">{String(i + 1).padStart(2, "0")}</span> {label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container-site max-w-4xl">
          {sent ? (
            <div className="rounded-lg bg-card p-10 text-center shadow-soft">
              <Check className="mx-auto size-10 text-gold" />
              <h2 className="headline mt-4 text-3xl">Danke für deine Anfrage!</h2>
              <p className="mt-3 text-muted-foreground">
                Dein E-Mail-Programm wurde mit der Zusammenfassung geöffnet. Falls nicht, ruf uns
                gern direkt an: <a href={site.phoneHref} className="font-semibold text-foreground">{site.phoneDisplay}</a>
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-card p-6 shadow-soft sm:p-10">
              {step === 0 && (
                <StepShell title="Was feierst du?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {eventTypes.map((t) => (
                      <ChoiceButton key={t} active={s.eventType === t} onClick={() => patch({ eventType: t })}>
                        {t}
                      </ChoiceButton>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 1 && (
                <StepShell title="Wie viele Gäste erwartest du?">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {guestRanges.map((g) => (
                      <ChoiceButton key={g} active={s.guests === g} onClick={() => patch({ guests: g })}>
                        {g} Gäste
                      </ChoiceButton>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell title="Welche Ausstattung brauchst du?" hint="Mengen sind optional – wir beraten dich gern.">
                  <div className="space-y-8">
                    {categories.map((cat) => (
                      <div key={cat.id}>
                        <p className="eyebrow">{cat.name}</p>
                        <ul className="mt-3 divide-y divide-border">
                          {products.filter((p) => p.category === cat.id).map((p) => {
                            const sel = s.items[p.id];
                            return (
                              <li key={p.id} className="py-3">
                                <div className="flex flex-wrap items-center gap-3">
                                  <label className="flex flex-1 cursor-pointer items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={!!sel}
                                      onChange={() => toggleItem(p.id)}
                                      className="size-5 accent-[var(--gold)]"
                                    />
                                    <span className="font-medium">{p.name}</span>
                                  </label>
                                  {sel && p.variants && (
                                    <select
                                      value={sel.variant}
                                      onChange={(e) => setS((prev) => ({ ...prev, items: { ...prev.items, [p.id]: { ...sel, variant: e.target.value } } }))}
                                      className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    >
                                      {p.variants.map((v) => <option key={v}>{v}</option>)}
                                    </select>
                                  )}
                                  {sel && (
                                    <Input
                                      type="number"
                                      min={1}
                                      placeholder="Menge"
                                      value={sel.qty}
                                      onChange={(e) => setS((prev) => ({ ...prev, items: { ...prev.items, [p.id]: { ...sel, qty: e.target.value } } }))}
                                      className="h-9 w-24"
                                    />
                                  )}
                                </div>
                                {sel && p.note && <p className="mt-2 pl-8 text-xs text-gold">{p.note}</p>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell title="Wo findet die Feier statt?">
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="zip">PLZ</Label>
                      <Input id="zip" inputMode="numeric" maxLength={5} value={s.zip} onChange={(e) => patch({ zip: e.target.value.replace(/\D/g, "") })} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="city">Ort (optional)</Label>
                      <Input id="city" value={s.city} onChange={(e) => patch({ city: e.target.value })} />
                    </div>
                    <div className="space-y-2 sm:col-span-3">
                      <Label htmlFor="date">Datum (optional)</Label>
                      <Input id="date" type="date" value={s.date} onChange={(e) => patch({ date: e.target.value })} />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="eyebrow">Abholung oder Lieferung?</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {(
                        [
                          ["pickup", "Selbstabholung", "in Köngernheim"],
                          ["delivery", "Lieferung", "individuelles Angebot"],
                          ["unsure", "Noch offen", "wir beraten dich"],
                        ] as const
                      ).map(([v, l, sub]) => (
                        <ChoiceButton key={v} active={s.delivery === v} onClick={() => patch({ delivery: v })} disabled={v === "pickup" && hasTent}>
                          <span className="block">{l}</span>
                          <span className="block text-xs font-normal opacity-70">{sub}</span>
                        </ChoiceButton>
                      ))}
                    </div>
                    {hasTent && (
                      <p className="mt-3 text-sm text-gold">
                        Partyzelte liefern wir immer inklusive Auf- und Abbau – Selbstabholung ist für Zelte nicht möglich.
                      </p>
                    )}
                  </div>
                </StepShell>
              )}

              {step === 4 && (
                <StepShell title="Wie erreichen wir dich?">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" required value={s.name} onChange={(e) => patch({ name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" type="email" required value={s.email} onChange={(e) => patch({ email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon (optional)</Label>
                      <Input id="phone" type="tel" value={s.phone} onChange={(e) => patch({ phone: e.target.value })} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="message">Anmerkungen (optional)</Label>
                      <Textarea id="message" rows={4} value={s.message} onChange={(e) => patch({ message: e.target.value })} />
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 5 && (
                <StepShell title="Deine Zusammenfassung" hint="Prüfe deine Angaben und sende die Anfrage ab. Ein persönliches Angebot folgt.">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <Row k="Veranstaltung" v={s.eventType} />
                    <Row k="Gästezahl" v={s.guests} />
                    <Row k="Ort" v={`${s.zip} ${s.city}`.trim()} />
                    <Row k="Datum" v={s.date || "noch offen"} />
                    <Row k="Abholung/Lieferung" v={{ pickup: "Selbstabholung", delivery: "Lieferung", unsure: "noch offen" }[s.delivery]} />
                    <Row k="Kontakt" v={`${s.name} · ${s.email}${s.phone ? ` · ${s.phone}` : ""}`} />
                  </dl>
                  <div className="mt-8">
                    <p className="eyebrow">Ausstattung</p>
                    <ul className="mt-3 divide-y divide-border">
                      {Object.entries(s.items).map(([id, v]) => {
                        const p = products.find((x) => x.id === id)!;
                        return (
                          <li key={id} className="flex justify-between py-2 text-sm">
                            <span>{p.name}{v.variant ? ` · ${v.variant}` : ""}</span>
                            <span className="text-muted-foreground">{v.qty ? `× ${v.qty}` : "Menge offen"}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {s.message && <p className="mt-6 text-sm text-muted-foreground">„{s.message}“</p>}
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="gold" size="xl" onClick={() => setSent(true)}>
                      <a href={mailto}>
                        <Mail /> Anfrage per E-Mail senden
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="xl">
                      <a href={site.phoneHref}>
                        <Phone /> Lieber anrufen
                      </a>
                    </Button>
                  </div>
                </StepShell>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <Button variant="ghost" onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0}>
                  <ArrowLeft /> Zurück
                </Button>
                {step < steps.length - 1 && (
                  <Button variant="default" size="lg" onClick={() => setStep((v) => v + 1)} disabled={!canNext}>
                    Weiter <ArrowRight />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function StepShell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="headline text-3xl">{title}</h2>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function ChoiceButton({ active, children, disabled, onClick }: { active: boolean; children: React.ReactNode; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-md border px-5 py-4 text-left font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "border-ink bg-ink text-ink-foreground" : "border-border bg-background hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="eyebrow">{k}</dt>
      <dd className="mt-1 font-medium">{v}</dd>
    </div>
  );
}