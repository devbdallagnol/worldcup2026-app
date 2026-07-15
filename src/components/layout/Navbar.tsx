import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Trophy } from "lucide-react";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/grupos", label: "Grupos" },
  { to: "/selecoes", label: "Seleções" },
  { to: "/jogos", label: "Jogos" },
  { to: "/mata-mata", label: "Mata-mata" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-pitch/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Trophy className="h-6 w-6 text-gold" strokeWidth={1.75} />
          <span className="font-display text-2xl tracking-wide text-bone">
            COPA<span className="text-gold">2026</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-turf/20 text-gold" : "text-bone/70 hover:text-bone"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="rounded-lg p-2 text-bone md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-turf/20 text-gold" : "text-bone/70"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
