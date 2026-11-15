"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Remounts page content per pathname so .intro animations replay after every navigation
 * (works for /work/a → /work/b too, which a root template.tsx would not).
 * Also resets the desktop showcase frame's own scroll position.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    document.querySelector<HTMLElement>("[data-scroller]")?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div key={pathname} data-page>
      {children}
    </div>
  );
}
