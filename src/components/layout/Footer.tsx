import { Github, Linkedin, Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-pitch-light">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold" />
            <span className="font-display text-xl tracking-wide">
              COPA<span className="text-gold">2026</span>
            </span>
          </div>

          <p className="max-w-md text-sm text-bone/50">
            Projeto de portfólio não-oficial sobre a Copa do Mundo FIFA 2026.
            Dados de demonstração — não afiliado à FIFA.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/devbdallagnol"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line p-2 text-bone/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/bruno-a-b-dall-agnol"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line p-2 text-bone/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-bone/30">
          Construído com React, TypeScript e Tailwind CSS ·{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
