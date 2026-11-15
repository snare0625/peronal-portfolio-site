"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-follow preview (Service + Experience rows).
 * The preview lags the pointer (lerp .13), leans with horizontal velocity, sits at +8°,
 * and scales/fades in while `active`. Only runs on fine pointers; rAF stops when settled.
 */
export function useFollower<S extends HTMLElement = HTMLElement>(active: boolean) {
  const sectionRef = useRef<S>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const kickRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
    kickRef.current();
  }, [active]);

  useEffect(() => {
    const section = sectionRef.current;
    const el = previewRef.current;
    if (!section || !el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0, mx = 0, my = 0, x = 0, y = 0, scale = 0, lean = 0;

    const step = () => {
      const target = activeRef.current ? 1 : 0;
      if (scale < 0.02) { x = mx; y = my; }
      const dx = (mx - x) * 0.13;
      x += dx;
      y += (my - y) * 0.13;
      lean += (Math.max(-8, Math.min(8, dx * 0.35)) - lean) * 0.2;
      scale += (target - scale) * 0.15;
      if (Math.abs(target - scale) < 0.002) scale = target;

      el.style.transform =
        "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) translate(-50%,-50%) rotate(" +
        (8 + lean).toFixed(2) + "deg) scale(" + (0.55 + 0.45 * scale).toFixed(3) + ")";
      el.style.opacity = scale.toFixed(3);

      const settled = scale === target && Math.abs(mx - x) < 0.5 && Math.abs(my - y) < 0.5 && Math.abs(lean) < 0.05;
      raf = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
    const move = (e: PointerEvent) => {
      const b = section.getBoundingClientRect();
      mx = e.clientX - b.left;
      my = e.clientY - b.top;
      kick();
    };

    kickRef.current = kick;
    section.addEventListener("pointermove", move);
    return () => {
      section.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      kickRef.current = () => {};
    };
  }, []);

  return { sectionRef, previewRef };
}
