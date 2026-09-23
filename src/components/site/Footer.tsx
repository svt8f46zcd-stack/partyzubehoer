import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 text-ink-foreground lg:pb-0">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <p className="eyebrow">Partyzubehör Buchert</p>
          <h2 className="headline mt-4 text-3xl lg:text-4xl">
            Ausstattung, Getränke und Zelte – aus einer Hand.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
            Verleih von Partyzubehör und Veranstaltungsausstattung für private Feiern,
            Vereinsfeste und Veranstaltungen in {site.region}.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/ausstattung" className="hover:text-gold">Ausstattung</Link></li>
            <li><Link to="/planer" className="hover:text-gold">Veranstaltungsplaner</Link></li>
            <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/kontakt" className="hover:text-gold">Kontakt</Link></li>
          </ul>
        </div>

        <address className="not-italic lg:col-span-4">
          <p className="eyebrow">Kontakt</p>
          <div className="mt-4 space-y-1 text-sm text-ink-muted">
            <p className="text-ink-foreground">{site.name}</p>
            <p>{site.owner}</p>
            <p>{site.street}</p>
            <p>{site.zip} {site.city}</p>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <p><a href={site.phoneHref} className="hover:text-gold">{site.phoneDisplay}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></p>
          </div>
        </address>
      </div>
      <div className="border-t border-ink-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · {site.city}</p>
          <p>Demo-Relaunch · Alle Preise auf Anfrage</p>
        </div>
      </div>
    </footer>
  );
}