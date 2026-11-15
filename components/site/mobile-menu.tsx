"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteSettings, Social } from "@/lib/types";
import { SocialPill } from "./social-pill";
import { StatusPill } from "./status-pill";
import { ThinClose } from "./thin-icons";

const LINKS = [
  { id: "work", label: "Work", count: "work" },
  { id: "skills", label: "Skills", count: "service" },
  { id: "experience", label: "Experience", count: "experience" },
  { id: "contact", label: "Contact", count: null },
] as const;

const circle =
  "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#ECECEC] bg-paper text-ink shadow-float outline-none transition-colors hover:border-[#CFCFCF] focus-visible:ring-2 focus-visible:ring-ring";

const stagger = (ms: number): CSSProperties => ({ animationDelay: ms + "ms", animationFillMode: "backwards" });

/** Smooth-scrolls to a section in either the desktop showcase frame or the window. */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const frame = document.querySelector<HTMLElement>("[data-scroller]");
  if (frame && getComputedStyle(frame).overflowY === "auto") {
    const top = el.getBoundingClientRect().top - frame.getBoundingClientRect().top + frame.scrollTop;
    frame.scrollTo({ top, behavior: "smooth" });
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  }
  history.replaceState(null, "", "#" + id);
}

/**
 * Full-screen menu for widths where the nav links don't fit (< 940px frame).
 * Rows rise in with a 60ms stagger; picking one closes the menu, then scrolls.
 */
export function MobileMenu({ site, socials, className }: { site: SiteSettings; socials: Social[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const target = useRef<string | null>(null);

  /** Close first; onCloseAutoFocus scrolls to the link's #section once the dialog is gone. */
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    target.current = e.currentTarget.hash.slice(1) || null;
    setOpen(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger aria-label="Open menu" className={cn(circle, className)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className="size-5" aria-hidden>
          <path d="M4 9h16M4 15h16" />
        </svg>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          onCloseAutoFocus={(e) => {
            const id = target.current;
            if (!id) return;
            e.preventDefault();
            target.current = null;
            requestAnimationFrame(() => scrollToSection(id));
          }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper font-sans duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Jump to a section</DialogPrimitive.Description>

          <div className="flex items-center justify-between gap-4 px-5 pt-[18px]">
            <StatusPill available={site.available} label={site.availabilityLabel} />
            <DialogPrimitive.Close aria-label="Close menu" className={circle}>
              <ThinClose className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <nav className="mt-10 px-5">
            {LINKS.map((l, i) => (
              <a
                key={l.id}
                href={"#" + l.id}
                onClick={go}
                style={stagger(80 + i * 60)}
                className="flex items-baseline justify-between gap-4 border-b border-line py-5 font-title text-[clamp(34px,10vw,48px)] font-medium leading-none tracking-[-.025em] text-ink duration-500 animate-in fade-in-0 slide-in-from-bottom-4"
              >
                <span>/{l.label.toUpperCase()}</span>
                {l.count && <span className="font-sans text-sm font-medium tracking-normal text-[#ABABAB]">[{site.counts[l.count]}]</span>}
              </a>
            ))}
          </nav>

          <div style={stagger(340)} className="mt-auto flex flex-col gap-6 px-5 pb-8 pt-10 duration-500 animate-in fade-in-0 slide-in-from-bottom-4">
            <Button asChild size="lg" className="self-start">
              <a href="#contact" onClick={go}>Let’s Talk<IconArrowUpRight stroke={1.8} /></a>
            </Button>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <SocialPill key={s.label} social={s} />
              ))}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
