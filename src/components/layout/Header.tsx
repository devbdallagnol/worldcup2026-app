import { ReactNode } from "react";

interface HeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function Header({ eyebrow, title, description, action }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl leading-none tracking-wide text-bone sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-bone/60">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
