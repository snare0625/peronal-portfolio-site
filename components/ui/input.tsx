import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xl border border-input bg-paper px-4 text-base text-ink outline-none transition-[color,box-shadow,border-color] placeholder:text-[#9A9A9A] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
