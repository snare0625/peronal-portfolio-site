"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { delay as d } from "@/lib/utils";

/**
 * Scroll reveal: rises 36px + fades in once when it enters the viewport.
 * Works with both window scroll and the desktop showcase frame (IO clips to scroll ancestors).
 * Styles live in globals.css ([data-reveal]); reduced-motion users get no animation.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={shown ? "shown" : "hidden"} style={d(delay)} className={className}>
      {children}
    </div>
  );
}
