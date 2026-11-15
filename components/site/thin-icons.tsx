import type { SVGProps } from "react";

/** Hairline ↗ and × used on the Service rows. */
export function ThinArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="square" aria-hidden {...props}>
      <path d="M4 20 20 4M7 4h13v13" />
    </svg>
  );
}

export function ThinClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="square" aria-hidden {...props}>
      <path d="m4 4 16 16M20 4 4 20" />
    </svg>
  );
}
