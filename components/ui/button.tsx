import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full font-sans font-semibold outline-none transition-[translate,background-color,border-color,box-shadow,color] duration-300 ease-out-soft focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        /** Black pill — Let's Talk, Get in touch, Live Site */
        default: "bg-[#181818] text-white shadow-btn hover:-translate-y-0.5",
        /** Black pill with grey ring — footer Contact Me */
        ring: "bg-ink text-white shadow-cta hover:-translate-y-0.5",
        /** White pill — View All Work, Back, secondary */
        outline: "border border-[#E8E8E8] bg-paper text-[#1E1E1E] hover:border-[#C9C9C9]",
        ghost: "text-ink hover:bg-accent",
      },
      size: {
        default: "h-pill px-[clamp(18px,1.7cqw,24px)] text-ui",
        lg: "h-[clamp(46px,3.8cqw,56px)] px-[clamp(20px,1.9cqw,28px)] text-[length:clamp(14px,1.25cqw,18px)]",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
