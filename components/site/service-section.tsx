"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";
import { FollowPreview } from "./follow-preview";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ThinArrow, ThinClose } from "./thin-icons";
import { useFollower } from "./use-follower";

/**
 * Row open state (hover on mouse, tap on touch, Enter/Space on keyboard):
 * bg → #2B2B2B, label rolls to its duplicate, description expands, ↗ cross-fades to ×,
 * and a tilted preview follows the cursor.
 */
export function ServiceSection({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(-1);
  const pointer = useRef("mouse");
  const { sectionRef, previewRef } = useFollower<HTMLElement>(Boolean(services[open]?.previewUrl));
  const toggle = (i: number) => setOpen((o) => (o === i ? -1 : i));

  return (
    <section
      id="skills"
      ref={sectionRef}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(-1)}
      className="relative bg-mist px-gutter pb-[clamp(80px,9cqw,130px)] pt-[clamp(32px,3cqw,44px)]"
    >
      <SectionHeading ghost="SKILLS" title="/SKILLS" />

      <div className="mt-[clamp(36px,5cqw,72px)]">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={s.title} delay={i * 90}>
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onPointerDown={(e) => { pointer.current = e.pointerType; }}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setOpen(i); }}
                onClick={() => { if (pointer.current !== "mouse") toggle(i); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); }
                }}
                className={cn(
                  "relative flex cursor-pointer items-center justify-between gap-6 rounded-[2px] border-b px-[clamp(14px,1.9cqw,28px)] py-[clamp(26px,4.2cqw,60px)] outline-none transition-[background-color,color,border-color] duration-500 ease-out-soft focus-visible:ring-2 focus-visible:ring-ring",
                  isOpen ? "border-transparent bg-charcoal-hi text-white" : "border-rule bg-charcoal-hi/0 text-ink"
                )}
              >
                <div className="min-w-0">
                  <div className="h-[1.1em] overflow-hidden font-title text-row font-normal leading-[1.1] tracking-[-.02em]">
                    <div className={cn("transition-transform duration-[650ms] ease-roll", isOpen && "-translate-y-1/2")}>
                      <div className="truncate">{s.title}</div>
                      <div aria-hidden className="truncate">{s.title}</div>
                    </div>
                  </div>
                  <div className={cn("grid transition-[grid-template-rows] duration-[550ms] ease-out-soft", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <p
                        className={cn(
                          "max-w-[470px] text-pretty pt-[clamp(12px,1.6cqw,22px)] text-[length:clamp(14px,1.4cqw,20px)] leading-[1.45] text-[#D2D2D2] transition-opacity delay-100 duration-[450ms]",
                          isOpen ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative size-[clamp(26px,2.9cqw,42px)] shrink-0">
                  <ThinArrow className={cn("absolute inset-0 size-full transition-[opacity,rotate,scale] duration-[450ms] ease-out-soft", isOpen ? "rotate-45 scale-60 opacity-0" : "opacity-100")} />
                  <ThinClose className={cn("absolute inset-0 size-full transition-[opacity,rotate,scale] duration-[450ms] ease-out-soft", isOpen ? "opacity-100" : "-rotate-90 scale-60 opacity-0")} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <FollowPreview
        previewRef={previewRef}
        active={open}
        items={services.map((s) => ({ src: s.previewUrl, label: s.title.toLowerCase() + " preview" }))}
        className="aspect-[1.38] w-[clamp(200px,25cqw,360px)]"
        frameClassName="bg-[#EDEDED]"
      />
    </section>
  );
}
