import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function StatusPill({
  available,
  label,
  className,
  style,
}: {
  available: boolean;
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "inline-flex h-[clamp(38px,3cqw,44px)] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#F0F0F0] bg-paper pl-3.5 pr-4 text-label font-semibold text-[#262626] shadow-float",
        className
      )}
    >
      <span className={cn("size-2.5 shrink-0 rounded-full", available ? "bg-signal" : "bg-[#BDBDBD]")} />
      {label}
    </div>
  );
}
