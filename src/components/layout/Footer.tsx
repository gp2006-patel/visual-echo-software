import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl">{site.studio}</p>
            <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {site.city}
            </p>
            <p className="mt-4 font-display text-xl text-brass">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-brass">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-5">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                Instagram · @dream_homevisuals
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/91${site.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                WhatsApp · {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brass">
                {site.email}
              </a>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {site.studio}
          </p>
        </div>
      </div>
    </footer>
  );
}
