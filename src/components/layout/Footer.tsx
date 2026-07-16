import { Globe, Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.03] bg-gradient-to-b from-transparent to-[#040a08]/90 relative overflow-hidden">
      {/* Brilho verde sutil na lateral inferior esquerda */}
      <div className="absolute bottom-0 left-0 w-80 h-40 bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 py-12 relative z-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-2">
              <Trophy className="h-4.5 w-4.5 text-amber-400/80" />
            </div>
            <span className="font-display text-lg font-black tracking-wider text-neutral-200">
              COPA<span className="text-amber-400">2026</span>
            </span>
          </div>

          {/* Texto de Isenção de Responsabilidade (Disclamer) */}
          <p className="max-w-md text-xs text-neutral-500 leading-relaxed">
            Projeto de portfólio não-oficial sobre a Copa do Mundo FIFA 2026.
            Dados de demonstração — não afiliado à FIFA ou entidades oficiais.
          </p>

          {/* Links Sociais Modernos */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/devbdallagnol"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/5 bg-white/[0.01] p-2.5 text-neutral-400 transition-all hover:border-amber-500/40 hover:text-amber-400 hover:bg-amber-500/5 hover:-translate-y-0.5"
              aria-label="GitHub"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/bruno-a-b-dall-agnol"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/5 bg-white/[0.01] p-2.5 text-neutral-400 transition-all hover:border-amber-500/40 hover:text-amber-400 hover:bg-amber-500/5 hover:-translate-y-0.5"
              aria-label="LinkedIn"
            >
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Linha Divisória de Dissolução Suave */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent my-8" />

        {/* Direitos Autorais e Rodapé */}
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-neutral-600">
          Construído com React, TypeScript e Tailwind CSS · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}