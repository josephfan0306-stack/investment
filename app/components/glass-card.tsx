import { forwardRef, type ComponentPropsWithoutRef } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div">;

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { children, className = "", ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
});
