import type { Ref } from "react";
import { cn } from "@/lib/utils";
import { Media } from "./media";

/**
 * Floating tilted image that follows the cursor. Position/scale are driven by useFollower.
 * Rows without an image get no preview (no striped placeholder chasing the cursor).
 */
export function FollowPreview({
  previewRef,
  items,
  active,
  className,
  frameClassName,
}: {
  previewRef: Ref<HTMLDivElement>;
  items: { src: string | null; label: string }[];
  active: number;
  className?: string;
  frameClassName?: string;
}) {
  if (!items.some((it) => it.src)) return null;
  return (
    <div
      ref={previewRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-10 hidden opacity-0 will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block",
        className
      )}
    >
      <div className={cn("relative size-full overflow-hidden rounded-[3px] shadow-preview", frameClassName)}>
        {items.map((it, i) => (
          <div key={i} className={cn("absolute inset-0 transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}>
            {it.src && <Media src={it.src} alt="" label={it.label} sizes="360px" />}
          </div>
        ))}
      </div>
    </div>
  );
}
