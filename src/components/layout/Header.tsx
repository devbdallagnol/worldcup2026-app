import type { ReactNode } from "react";

interface HeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function Header({ eyebrow, title, description, action }: HeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-4 border-b border-white/5 pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl font-black tracking-tight text-bone sm:text-5xl leading-none">
          {title}
        </h1>
        {description && (
          <p className="max-w-xl text-sm leading-relaxed text-bone/60">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 pt-2 sm:pt-0">{action}</div>}
    </header>
  );
}