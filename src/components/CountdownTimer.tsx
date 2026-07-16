import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

interface DigitProps {
  value: number;
  unit: string;
}

function Digit({ value, unit }: DigitProps) {
  const padded = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-16 overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] sm:h-24 sm:w-20">
        <motion.div
          key={padded}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-extrabold text-gold text-glow sm:text-5xl"
        >
          {padded}
        </motion.div>
        {/* Linha de divisão central moderna (efeito flip-clock) */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[1px] bg-white/5" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60">
        {unit}
      </span>
    </div>
  );
}

export function CountdownTimer({
  targetDate,
  label = "A bola rola em",
}: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isFinished } =
    useCountdown(targetDate);

  if (isFinished) {
    return (
      <div className="glass-card rounded-2xl border border-gold/30 px-8 py-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="font-display text-3xl font-black tracking-tight text-gold text-glow">
          É hoje! 🏆
        </p>
        <p className="mt-1 text-sm text-gold/70">A grande festa começou!</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl border border-white/5 px-8 py-8 relative overflow-hidden">
      {/* Barra de brilho sutil interna */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
      
      <p className="mb-6 text-center text-xs font-black uppercase tracking-[0.3em] text-emerald-400/80">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <Digit value={days} unit="dias" />
        <span className="pb-6 font-display text-2xl text-white/20 font-bold">:</span>
        <Digit value={hours} unit="horas" />
        <span className="pb-6 font-display text-2xl text-white/20 font-bold">:</span>
        <Digit value={minutes} unit="min" />
        <span className="pb-6 font-display text-2xl text-white/20 font-bold">:</span>
        <Digit value={seconds} unit="seg" />
      </div>
    </div>
  );
}