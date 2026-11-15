import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

// Teach tailwind-merge about the custom tokens in globals.css so e.g. `text-ui` (size) and `text-ink` (colour) don't collide.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["ui", "label", "body", "role", "section", "row", "ghost", "card-title", "exp", "cta", "lead", "case", "note", "name"],
      spacing: ["pill", "chip", "gutter"],
      shadow: ["btn", "cta", "float", "tile", "tile-hover", "preview"],
      ease: ["out-soft", "roll"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stagger helper for `.intro` and `<Reveal>` — sets the --d custom property. */
export const delay = (ms: number) => ({ "--d": ms + "ms" }) as CSSProperties;
