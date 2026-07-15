import { HTMLAttributes } from "react";

type Tone = "neutral" | "live" | "finished" | "scheduled" | "gold";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-pitch-lighter text-bone/80 border-line",
  live: "bg-flame/15 text-flame border-flame/40 animate-pulse",
  finished: "bg-turf/15 text-turf-light border-turf/40",
  scheduled: "bg-bone/5 text-bone/60 border-line",
  gold: "bg-gold/15 text-gold border-gold/40",
};

export function Badge({ tone = "neutral", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest2 ${TONE_CLASSES[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
