"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/types";
import { FollowPreview } from "./follow-preview";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useFollower } from "./use-follower";

/** Charcoal block; hovering a row floats a tilted work sample that follows the cursor. */
export function ExperienceSection({ items, yearsLabel }: { items: Experience[]; yearsLabel: string }) {
  const [hover, setHover] = useState(-1);
  const { sectionRef, previewRef } = useFollower<HTMLElement>(Boolean(items[hover]?.previewUrl));

  return (
    <section
      id="experience"
      ref={sectionRef}
      onPointerLeave={() => setHover(-1)}
      className="relative bg-charcoal px-gutter pb-[clamp(80px,9cqw,130px)] pt-[clamp(32px,3cqw,44px)] text-white"
    >
      <SectionHeading
        ghost="EXPERIENCE"
        title="/EXPERIENCE"
        tone="dark"
        aside={<p className="mb-[.35em] text-[length:clamp(15px,1.6cqw,23px)] font-medium text-[#EDEDED]">{yearsLabel}</p>}
      />

      <div className="mt-[clamp(24px,3.6cqw,52px)]">
        {items.map((x, i) => (
          <Reveal key={x.company + x.period} delay={i * 90}>
            <div
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
              className={cn(
                "flex justify-between gap-6 border-t px-[clamp(10px,1.2cqw,18px)] py-[clamp(20px,2.7cqw,38px)]",
                x.summary ? "items-start" : "items-center",
                i === 0 ? "border-transparent" : "border-white/12"
              )}
            >
              <div className="min-w-0">
                <div className="text-exp font-medium leading-[1.3] text-white">{x.company}</div>
                <div className="mt-[clamp(8px,1cqw,14px)] text-exp font-medium leading-[1.3] text-faint">{x.role}</div>
                {x.summary && (
                  <p className="mt-[clamp(10px,1.2cqw,16px)] max-w-[680px] text-pretty text-[length:clamp(14px,1.25cqw,18px)] leading-[1.55] text-[#B5B5B5]">{x.summary}</p>
                )}
              </div>
              <div className="shrink-0 text-right text-[length:clamp(14px,1.65cqw,24px)] font-medium text-[#9A9A9A]">{x.period}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <FollowPreview
        previewRef={previewRef}
        active={hover}
        items={items.map((x) => ({ src: x.previewUrl, label: x.company + " · work sample" }))}
        className="aspect-[1.3] w-[clamp(200px,22.5cqw,330px)]"
        frameClassName="bg-[#8F8F8F] shadow-[0_34px_60px_-18px_rgba(0,0,0,.55)]"
      />
    </section>
  );
}
