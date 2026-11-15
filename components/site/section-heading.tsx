import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Giant ghost watermark word with the "/TITLE" heading overlapping its lower half. */
export function SectionHeading({
  ghost,
  title,
  align = "start",
  tone = "light",
  aside,
}: {
  ghost: string;
  title: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  aside?: ReactNode;
}) {
  const center = align === "center";
  return (
    <Reveal>
      <div className={cn("grid overflow-hidden", center ? "justify-items-center" : "justify-items-stretch")}>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none select-none whitespace-nowrap font-display text-ghost font-medium leading-none tracking-[.07em] [grid-area:1/1]",
            tone === "dark" ? "text-ghost-dark" : "text-ghost-light",
            center ? "-mr-[.07em]" : "-ml-[.05em]"
          )}
        >
          {ghost}
        </span>
        <div
          className={cn(
            "relative mt-[6.1cqw] flex flex-wrap items-end gap-x-6 gap-y-3 [grid-area:1/1]",
            center ? "justify-center" : "justify-between"
          )}
        >
          <h2 className={cn("font-title text-section font-medium leading-none tracking-[-.025em]", tone === "dark" ? "text-white" : "text-ink")}>
            {title}
          </h2>
          {aside}
        </div>
      </div>
    </Reveal>
  );
}
