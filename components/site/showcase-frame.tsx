import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Desktop (lg+): the site floats in a 10px-radius window over the grayscale clouds, inset 8vw × 9vh,
 * and scrolls inside that window. Mobile/tablet: normal full-bleed page with window scroll.
 * `@container` makes every `cqw` size in the design scale with the window, not the viewport.
 */
export function ShowcaseFrame({ showcase, children }: { showcase: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-dvh",
        showcase &&
          "lg:fixed lg:inset-0 lg:bg-[#A9A9A9] lg:bg-[url(/images/clouds.jpg)] lg:bg-cover lg:bg-center lg:px-[clamp(14px,8vw,126px)] lg:py-[clamp(14px,8.9vh,96px)]"
      )}
    >
      <div
        data-scroller
        className={cn(
          "@container relative bg-mist",
          showcase && "no-scrollbar lg:h-full lg:overflow-y-auto lg:overflow-x-hidden lg:rounded-[10px] lg:scroll-smooth"
        )}
      >
        {children}
      </div>
    </div>
  );
}
