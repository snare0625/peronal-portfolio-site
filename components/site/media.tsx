import Image from "next/image";
import { cn } from "@/lib/utils";

/** Fills its (relative) parent. No src → striped placeholder with a mono caption of what goes there. */
export function Media({
  src,
  alt,
  label,
  sizes = "100vw",
  className,
  fit = "cover",
  eager = false,
}: {
  src: string | null;
  alt: string;
  label: string;
  sizes?: string;
  className?: string;
  fit?: "cover" | "contain";
  eager?: boolean;
}) {
  if (!src) {
    return (
      <div aria-hidden className={cn("absolute inset-0 flex items-end bg-stripes p-3", className)}>
        {label && <span className="rounded-md bg-white/85 px-2 py-1 font-mono text-[11px] leading-none text-[#666]">{label}</span>}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
