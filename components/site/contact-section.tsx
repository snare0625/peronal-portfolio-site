import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase/server";
import type { SiteSettings, Social } from "@/lib/types";
import { ContactDialog } from "./contact-dialog";
import { Media } from "./media";
import { Reveal } from "./reveal";
import { SocialPill } from "./social-pill";
import { StatusPill } from "./status-pill";

/** Brightened grayscale clouds + frosted top band; form dialog when Supabase is connected, mailto otherwise. */
export function ContactSection({ site, socials }: { site: SiteSettings; socials: Social[] }) {
  const formEnabled = Boolean(getSupabase());

  return (
    <section id="contact" className="relative overflow-hidden bg-[#F5F5F5]">
      <div aria-hidden className="absolute inset-0 bg-[url(/images/clouds.jpg)] bg-cover bg-center brightness-[1.42] contrast-[.92] grayscale" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,246,246,.35)_0%,rgba(246,246,246,.15)_60%,rgba(246,246,246,.7)_100%)]" />
      <div aria-hidden className="relative h-[clamp(56px,8.6cqw,124px)] bg-[linear-gradient(180deg,rgba(244,244,244,.96)_0%,rgba(226,226,226,.92)_100%)] shadow-[0_1px_0_rgba(0,0,0,.04)] backdrop-blur-[14px]" />

      <div className="relative flex flex-col items-center px-5 pt-[clamp(72px,8.6cqw,124px)] text-center">
        <Reveal>
          <StatusPill available={site.available} label={site.availabilityLabel} />
        </Reveal>
        <Reveal delay={90}>
          <h2 className="mt-[clamp(28px,3.6cqw,52px)] text-balance text-cta font-bold leading-[1.05] tracking-[-.025em] text-[#1A1A1A]">{site.ctaTitle}</h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-[clamp(16px,1.6cqw,24px)] max-w-[880px] text-balance text-lead font-medium leading-[1.68] text-[#5C5C5C]">{site.ctaBody}</p>
        </Reveal>
        <Reveal delay={270} className="mt-[clamp(28px,3.2cqw,46px)]">
          {formEnabled ? (
            <ContactDialog email={site.email} />
          ) : (
            <Button asChild variant="ring" size="lg">
              <a href={"mailto:" + site.email}>Contact Me<IconArrowUpRight stroke={1.8} /></a>
            </Button>
          )}
        </Reveal>
      </div>

      <Reveal delay={120} className="relative mx-auto mt-[clamp(64px,9.6cqw,140px)] w-[min(1052px,calc(100%-40px))] pb-[clamp(40px,6.4cqw,92px)]">
        <div className="flex flex-wrap items-center justify-center gap-3.5 @min-[900px]:justify-between">
          <div className="inline-flex h-[clamp(44px,3.6cqw,52px)] items-center gap-2.5 rounded-full bg-ink pl-[7px] pr-[clamp(18px,1.7cqw,24px)] text-[length:clamp(13px,1.2cqw,17px)] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(0,0,0,.5)]">
            <span className="relative size-[clamp(30px,2.5cqw,36px)] shrink-0 overflow-hidden rounded-full bg-[#C9B8A6]">
              <Media src={site.avatarUrl} alt="" label="" sizes="36px" />
            </span>
            {site.displayName}
          </div>
          {socials.map((s) => (
            <SocialPill key={s.label} social={s} className="hover:-translate-y-[3px]" />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
