import { asset } from "../lib/asset";
import { services, site } from "../lib/content";
import { LeafMark, Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="overflow-hidden pt-20 pb-6">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-lg" />
            <p className="mt-5 max-w-xs text-muted">Technology for a brighter tomorrow. Energie-installaties met ingenieursbegeleiding, in heel Vlaanderen.</p>
          </div>
          <div>
            <p className="eyebrow text-muted">Diensten</p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.key}>
                  <a href={asset(`/#dienst-${s.key}`)} className="hover:text-emerald">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted">VBTEC</p>
            <ul className="mt-4 space-y-2">
              <li><a href={asset("/#aanpak")} className="hover:text-emerald">Onze aanpak</a></li>
              <li><a href={asset("/#calculator")} className="hover:text-emerald">Calculator</a></li>
              <li><a href={asset("/#team")} className="hover:text-emerald">Team</a></li>
              <li><a href={asset("/#blog")} className="hover:text-emerald">Blog</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted">Contact</p>
            <ul className="mt-4 space-y-2">
              <li><a href={site.phoneHref} className="hover:text-emerald">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-emerald">{site.email}</a></li>
              <li className="text-muted">{site.region}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-center gap-[2vw] px-2 select-none" aria-hidden="true">
        <LeafMark className="size-[15vw]" />
        <span className="font-display text-[22vw] leading-[0.8] font-extrabold tracking-[-0.06em] text-deep">VBTEC</span>
      </div>

      <div className="container-x mt-8 flex flex-col justify-between gap-2 border-t border-ink/10 pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} VBTEC. Alle rechten voorbehouden.</p>
        <p>Privacy · Cookies · Algemene voorwaarden</p>
      </div>
    </footer>
  );
}
