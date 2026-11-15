import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-input bg-paper px-4 py-3 text-base text-ink outline-none transition-[color,box-shadow,border-color] placeholder:text-[#9A9A9A] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-[15px]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
