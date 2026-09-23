import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-border bg-ink/95 p-3 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <Button asChild variant="outlineLight" size="lg">
          <a href={site.phoneHref}>
            <Phone /> Anrufen
          </a>
        </Button>
        <Button asChild variant="gold" size="lg">
          <Link to="/planer">Feier planen</Link>
        </Button>
      </div>
    </div>
  );
}