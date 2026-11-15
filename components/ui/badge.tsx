import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-sans", {
  variants: {
    variant: {
      /** Tag chip on cards */
      chip: "h-chip border border-line bg-[#F8F8F8] px-[clamp(12px,1.1cqw,16px)] text-[length:clamp(13px,1.15cqw,17px)] font-medium text-[#424242]",
      /** Tag chip on the case study header */
      "chip-light": "h-chip border border-line bg-paper px-[clamp(12px,1.1cqw,16px)] text-[length:clamp(13px,1.15cqw,17px)] font-semibold text-[#2A2A2A]",
      /** "REAL PROJECT" label over thumbnails */
      label: "pointer-events-none h-[26px] bg-paper px-3 text-[11px] font-semibold uppercase tracking-[.02em] text-[#4A4A4A]",
      outline: "border px-2.5 py-0.5 text-xs font-medium",
    },
  },
  defaultVariants: { variant: "chip" },
});

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
