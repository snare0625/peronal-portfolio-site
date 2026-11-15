import { IconArrowUpRight, IconDownload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";
import type { SiteSettings, Social } from "@/lib/types";
import { FitName } from "./fit-name";
import { Portrait } from "./portrait";
import { SocialPill } from "./social-pill";
import { MobileMenu } from "./mobile-menu";
import { StatusPill } from "./status-pill";

const navLink = "inline-flex items-center gap-2 text-ui font-medium text-[#1F1F1F] transition-colors hover:text-black";
const count = "text-[.7em] tracking-[.02em] text-[#ABABAB]";

/**
 * ≥700px container: absolute composition from the reference (66cqw tall, portrait bottom-centre,
 * role block bottom-left, socials stacked bottom-right). Below: stacked flow for phones.
 * Load-in order: nav → name → role/socials → portrait (.intro + --d stagger).
 */
export function Hero({ site, socials }: { site: SiteSettings; socials: Social[] }) {
  return (
    <section
      id="top"
      className="relative flex flex-col overflow-hidden bg-paper @min-[700px]:block @min-[700px]:h-[66cqw] @min-[700px]:min-h-[480px]"
    >
      <nav
        style={delay(0)}
        className="intro relative z-[4] flex items-center justify-between gap-4 px-[clamp(20px,4.8cqw,70px)] pt-[clamp(18px,2.6cqw,36px)]"
      >
        <StatusPill available={site.available} label={site.availabilityLabel} />
        <div className="hidden min-w-0 items-center gap-[clamp(20px,6.4cqw,92px)] @min-[940px]:flex">
          <a href="#work" className={navLink}>Work<span className={count}>[{site.counts.work}]</span></a>
          <a href="#skills" className={navLink}>Skills<span className={count}>[{site.counts.service}]</span></a>
          <a href="#experience" className={navLink}>Experience<span className={count}>[{site.counts.experience}]</span></a>
          <a href="#contact" className={navLink}>Contact</a>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <Button asChild className="hidden @min-[420px]:inline-flex">
            <a href="#contact">Let’s Talk<IconArrowUpRight stroke={1.8} /></a>
          </Button>
          <MobileMenu site={site} socials={socials} className="@min-[940px]:hidden" />
        </div>
      </nav>

      <div style={delay(120)} className="intro relative z-[1] mx-[clamp(20px,5.5cqw,80px)] mt-[clamp(36px,7.6cqw,112px)]">
        <FitName first={site.firstName} last={site.lastName} />
      </div>

      <div
        style={delay(650)}
        className="intro relative z-[2] order-3 mx-auto mt-8 aspect-[555/423] w-[92%] @min-[700px]:absolute @min-[700px]:bottom-0 @min-[700px]:left-1/2 @min-[700px]:mt-0 @min-[700px]:aspect-auto @min-[700px]:h-[42.3cqw] @min-[700px]:w-[55.5cqw] @min-[700px]:-translate-x-1/2"
      >
        <Portrait src={site.portraitUrl} alt={site.displayName} />
      </div>

      <div className="relative z-[3] order-2 mt-8 px-5 @min-[700px]:absolute @min-[700px]:bottom-[clamp(28px,8.9cqw,128px)] @min-[700px]:left-[clamp(20px,7.5cqw,108px)] @min-[700px]:mt-0 @min-[700px]:max-w-[min(360px,30cqw)] @min-[700px]:px-0">
        <h2 style={delay(420)} className="intro text-[24px] @min-[700px]:text-role font-bold leading-[1.15] tracking-[-.01em] text-ink">{site.role}</h2>
        <p style={delay(520)} className="intro mt-[clamp(10px,1cqw,14px)] text-pretty text-[15px] @min-[700px]:text-body leading-[1.4] text-dim">{site.tagline}</p>
        <div style={delay(620)} className="intro mt-[clamp(16px,2cqw,28px)] flex flex-wrap gap-2.5">
          <Button asChild>
            <a href="#contact">Get in touch<IconArrowUpRight stroke={1.8} /></a>
          </Button>
          {site.cvUrl && (
            <Button asChild variant="outline">
              <a href={site.cvUrl} download target="_blank" rel="noreferrer">Download CV<IconDownload stroke={1.8} /></a>
            </Button>
          )}
        </div>
      </div>

      <div className="relative z-[3] order-4 flex flex-wrap gap-2.5 px-5 pb-8 pt-6 @min-[700px]:absolute @min-[700px]:bottom-[clamp(16px,2cqw,30px)] @min-[700px]:right-[clamp(20px,7.5cqw,108px)] @min-[700px]:flex-col @min-[700px]:items-end @min-[700px]:gap-[clamp(10px,2cqw,29px)] @min-[700px]:p-0">
        {socials.map((s, i) => (
          <SocialPill key={s.label} social={s} style={delay(480 + i * 80)} className="intro hover:-translate-x-[3px]" />
        ))}
      </div>
    </section>
  );
}
