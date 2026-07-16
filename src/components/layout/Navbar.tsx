import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Trophy } from "lucide-react";

const LINKS = [
  { to: "/", label: "Início", icon: "🏠" },
  { to: "/grupos", label: "Grupos", icon: "📊" },
  { to: "/selecoes", label: "Seleções", icon: "🌍" },
  { to: "/jogos", label: "Jogos", icon: "⚽" },
  { to: "/mata-mata", label: "Mata-mata", icon: "🏆" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/20 bg-gradient-to-b from-pitch/90 via-pitch/80 to-pitch/75 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo Premium */}
        <NavLink
          to="/"
          className="flex items-center gap-3 group shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="relative rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:border-gold/50 group-hover:shadow-[0_0_20px_rgba(227,178,60,0.3)]">
            <Trophy
              className="h-6 w-6 text-gold transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={2}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-xl font-black tracking-widest text-bone">
              COPA
              <span className="ml-1 bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
                2026
              </span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-gold/70">
              MUNDIAL
            </span>
          </div>
        </NavLink>

        {/* Links de Navegação Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `group relative px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 rounded-xl flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-gold/25 to-turf/15 text-bone border border-gold/40 shadow-[0_0_20px_rgba(227,178,60,0.25)]"
                    : "text-bone/70 border border-transparent hover:text-bone hover:bg-white/5 hover:border-gold/20"
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Botão de Menu Responsivo */}
        <button
          className="flex items-center justify-center rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5 p-2.5 text-bone hover:border-gold/50 hover:bg-gold/15 lg:hidden transition-all duration-300 hover:shadow-[0_0_12px_rgba(227,178,60,0.2)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Mobile Dropdown Moderno */}
      {open && (
        <div className="border-t border-gold/20 bg-gradient-to-b from-pitch-light/95 via-pitch/90 to-pitch/85 backdrop-blur-2xl px-4 py-4 sm:px-6 lg:hidden shadow-[0_12px_32px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-2 space-y-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-gold/25 to-turf/15 text-bone border border-gold/40 shadow-[0_0_16px_rgba(227,178,60,0.2)]"
                      : "text-bone/70 hover:text-bone hover:bg-white/5 hover:border-gold/20 border border-transparent"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
