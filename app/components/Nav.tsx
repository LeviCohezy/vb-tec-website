"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { asset } from "../lib/asset";
import { site } from "../lib/content";
import { Logo } from "./Logo";

const links = [
  { href: "/#diensten", label: "Diensten" },
  { href: "/#aanpak", label: "Onze aanpak" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/#team", label: "Team" },
  { href: "/#blog", label: "Blog" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  const withBase = (href: string) => asset(href);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500 ${
          solid || open ? "bg-paper/85 shadow-[0_8px_30px_-12px_rgb(1_40_33/0.18)] backdrop-blur-xl" : "glass"
        }`}
      >
        <a href={withBase("/")} aria-label="VBTEC home" className="text-[15px]">
          <Logo tone={solid || open ? "dark" : "light"} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={withBase(l.href)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  solid ? "text-ink/75 hover:bg-ink/5 hover:text-ink" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className={`hidden size-10 place-items-center rounded-full transition-colors sm:grid ${
              solid || open ? "bg-ink/5 text-ink" : "bg-white/15 text-white"
            }`}
            aria-label="Bel ons"
          >
            <Phone className="size-4" />
          </a>
          <a href={withBase("/#contact")} className="hidden rounded-full bg-lilac px-5 py-2.5 text-sm font-medium text-deep transition-transform hover:scale-[1.03] sm:inline-flex">
            Gratis studie aanvragen
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`grid size-10 place-items-center rounded-full lg:hidden ${solid || open ? "bg-deep text-white" : "bg-white text-deep"}`}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-w-[1320px] rounded-3xl bg-paper p-3 shadow-xl lg:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={withBase(l.href)} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display text-2xl font-medium text-ink hover:bg-sand">
                {l.label}
              </a>
            ))}
            <a href={withBase("/#contact")} onClick={() => setOpen(false)} className="mt-2 block rounded-2xl bg-deep px-4 py-4 text-center font-medium text-white">
              Gratis studie aanvragen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
