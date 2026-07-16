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
    <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#060e0b]/75 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        
        {/* Logo moderno com reflexo sutil */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 transition-transform duration-300 group-hover:scale-105">
            <Trophy className="h-5 w-5 text-amber-400" strokeWidth={2} />
          </div>
          <span className="font-display text-xl font-black tracking-wider text-neutral-100">
            COPA<span className="text-amber-400 text-glow">2026</span>
          </span>
        </NavLink>

        {/* Links de Navegação Desktop */}
        <div className="hidden items-center gap-1.5 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-white/[0.04] text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                    : "text-neutral-400 border border-transparent hover:text-neutral-100 hover:bg-white/[0.02]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Botão de Menu Responsivo */}
        <button
          className="rounded-xl border border-white/10 bg-white/[0.02] p-2 text-neutral-200 shadow-lg hover:bg-white/[0.06] md:hidden transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu Mobile Dropdown Refatorado */}
      {open && (
        <div className="border-t border-white/[0.05] bg-[#060e0b]/95 backdrop-blur-2xl px-5 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-1.5">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                    isActive 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                      : "text-neutral-400 hover:bg-white/[0.02] hover:text-neutral-200"
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