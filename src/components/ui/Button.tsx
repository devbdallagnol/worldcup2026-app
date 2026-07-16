import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  // Dourado premium com transição de brilho e escala suave no hover
  primary:
    "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 hover:brightness-110 shadow-[0_8px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_8px_35px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 font-bold",
  // Verde bandeira elegante
  secondary:
    "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:brightness-110 shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:-translate-y-0.5 font-semibold",
  // Vidro com borda reativa que se ilumina ao passar o mouse
  outline:
    "border border-white/10 text-neutral-200 hover:border-amber-500/50 hover:text-amber-400 bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-0.5",
  // Totalmente limpo com efeito de vidro apenas no hover
  ghost: "bg-transparent text-neutral-300 hover:bg-white/[0.04] hover:text-white",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl",
  md: "text-xs font-bold uppercase tracking-wider px-5.5 py-3 rounded-xl",
  lg: "text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";