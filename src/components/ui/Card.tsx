import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({
  hoverable = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`glass-card rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden ${
        hoverable
          ? "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_12px_40px_rgba(227,178,60,0.06)] bg-emerald-950/20 hover:bg-emerald-950/25"
          : ""
      } ${className}`}
      {...props}
    >
      {/* Detalhe de iluminação sutil no topo do card */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border-b border-white/5 px-6 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-5 ${className}`} {...props}>
      {children}
    </div>
  );
}