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
      <div className="relative h-16 w-14 overflow-hidden rounded-lg border border-line bg-ink shadow-card sm:h-20 sm:w-16">
        <motion.div
          key={padded}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-gold sm:text-4xl"
        >
          {padded}
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/40" />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-widest2 text-bone/50">
        {unit}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, label = "A bola rola em" }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isFinished } = useCountdown(targetDate);

  if (isFinished) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-gold/10 px-6 py-5 text-center">
        <p className="font-display text-2xl tracking-wide text-gold">É hoje! 🏆</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-pitch-light bg-turf-lines px-6 py-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest2 text-bone/50">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <Digit value={days} unit="dias" />
        <span className="pb-6 font-display text-2xl text-bone/30">:</span>
        <Digit value={hours} unit="horas" />
        <span className="pb-6 font-display text-2xl text-bone/30">:</span>
        <Digit value={minutes} unit="min" />
        <span className="pb-6 font-display text-2xl text-bone/30">:</span>
        <Digit value={seconds} unit="seg" />
      </div>
    </div>
  );
}
