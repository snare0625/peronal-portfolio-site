"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Media } from "./media";

const SIZES = "(min-width: 1024px) 55vw, 92vw";

/**
 * Hero portrait: grayscale, with a soft circle of full colour that follows the cursor
 * (radius ≈ 19% of the portrait width, eased in/out). Colour copy is masked by `.spotlight`.
 */
export function Portrait({ src, alt }: { src: string | null; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const mask = maskRef.current;
    if (!wrap || !mask) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0, tx = 0, ty = 0, x = 0, y = 0, r = 0, hover = false;
    const step = () => {
      const target = hover ? Math.max(110, wrap.clientWidth * 0.19) : 0;
      if (r < 1) { x = tx; y = ty; } else { x += (tx - x) * 0.18; y += (ty - y) * 0.18; }
      r += (target - r) * 0.12;
      if (!hover && r < 0.5) r = 0;
      mask.style.setProperty("--mx", x.toFixed(1) + "px");
      mask.style.setProperty("--my", y.toFixed(1) + "px");
      mask.style.setProperty("--r", r.toFixed(1) + "px");
      const settled = Math.abs(target - r) < 0.3 && Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3;
      raf = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
    const move = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
      hover = true;
      kick();
    };
    const leave = () => { hover = false; kick(); };

    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerleave", leave);
    return () => {
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className="relative size-full">
      <Media src={src} alt={alt} label="Portrait cutout · transparent PNG" sizes={SIZES} fit="contain" eager className={src ? "object-bottom grayscale" : undefined} />
      {src && (
        <div ref={maskRef} aria-hidden className="spotlight pointer-events-none absolute inset-0">
          <Image src={src} alt="" fill sizes={SIZES} className="object-contain object-bottom" />
        </div>
      )}
    </div>
  );
}
