import type { HTMLAttributes } from "react";

type Tone = "neutral" | "live" | "finished" | "scheduled" | "gold";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const TONE_CLASSES: Record<Tone, string> = {
  // Vidro neutro sofisticado
  neutral: "bg-white/[0.04] text-neutral-200 border-white/10",
  // Vermelho vivo neon com sombra pulsante
  live: "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.15)]",
  // Verde esportivo sofisticado
  finished: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  // Vidro cinza translúcido
  scheduled: "bg-white/[0.02] text-neutral-400 border-white/5",
  // Ouro campeão com glow premium
  gold: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
};

export function Badge({
  tone = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${TONE_CLASSES[tone]} ${className}`}
      {...props}
    >
      {/* Detalhe de bolinha de status para os badges ativos */}
      {(tone === "live" || tone === "gold") && (
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "live" ? "bg-red-400" : "bg-amber-400"}`} />
      )}
      {children}
    </span>
  );
}