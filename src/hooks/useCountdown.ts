import { useEffect, useMemo, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

function computeParts(target: number): CountdownParts {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isFinished: false };
}

/**
 * Contador regressivo reativo para uma data-alvo (ex.: início da final).
 * @param targetDate string ISO 8601 ou objeto Date
 */
export function useCountdown(targetDate: string | Date): CountdownParts {
  const target = useMemo(
    () => (targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime()),
    [targetDate]
  );

  const [parts, setParts] = useState<CountdownParts>(() => computeParts(target));

  useEffect(() => {
    setParts(computeParts(target));
    const interval = setInterval(() => {
      setParts(computeParts(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return parts;
}
