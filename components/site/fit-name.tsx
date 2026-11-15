"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero name, auto-sized to span exactly gutter-to-gutter whatever the name is.
 * First word outlined, second solid. Observes only the outer box (never the resized
 * span) and defers to rAF, so there's no ResizeObserver feedback loop.
 */
export function FitName({ first, last, className }: { first: string; last: string; className?: string }) {
  const boxRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!box || !inner) return;
    let raf = 0;
    const fit = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        inner.style.fontSize = "";
        const target = box.clientWidth;
        const width = inner.getBoundingClientRect().width;
        if (!target || !width) return;
        const current = parseFloat(getComputedStyle(inner).fontSize);
        inner.style.fontSize = ((current * target) / width).toFixed(2) + "px";
      });
    };
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [first, last]);

  return (
    <h1 ref={boxRef} aria-label={first + " " + last} className={cn("select-none whitespace-nowrap leading-none", className)}>
      <span
        ref={innerRef}
        aria-hidden
        className="-mr-[.055em] inline-block font-display text-name font-extrabold leading-none tracking-[.055em]"
      >
        <span className="text-outline">{first}</span> <span className="text-solid-stroke">{last}</span>
      </span>
    </h1>
  );
}
