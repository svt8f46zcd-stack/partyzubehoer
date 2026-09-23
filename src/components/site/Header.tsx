import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const nav = [
  { to: "/ausstattung", label: "Ausstattung" },
  { to: "/planer", label: "Veranstaltungsplaner" },
  { to: "/faq", label: "FAQ" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink-border bg-ink/90 text-ink-foreground backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between lg:h-20">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-medium tracking-tight lg:text-xl">
            Partyzubehör Buchert
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold">
            Köngernheim · Mainz &amp; Umgebung
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-ink-muted transition-colors hover:text-ink-foreground"
              activeProps={{ className: "text-ink-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghostLight" size="sm">
            <a href={site.phoneHref}>
              <Phone /> {site.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/planer">Feier planen</Link>
          </Button>
        </div>

        <button
          className="lg:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border bg-ink lg:hidden">
          <nav className="container-site flex flex-col py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-ink-border py-4 font-display text-2xl"
              >
                {n.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="flex items-center gap-2 py-4 text-ink-muted">
              <Phone className="size-4 text-gold" /> {site.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}