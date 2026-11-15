import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";
import { StatusPill } from "./status-pill";
import { TransitionLink } from "./transition-link";

export function TopBar({ site, href = "/" }: { site: SiteSettings; href?: string }) {
  return (
    <div style={delay(0)} className="intro flex items-center justify-between gap-4 px-[clamp(20px,4.6cqw,66px)] pt-[clamp(18px,2.4cqw,34px)]">
      <Button asChild variant="outline" className="border-[#EDEDED] pl-[clamp(14px,1.2cqw,18px)] shadow-[0_10px_24px_-12px_rgba(0,0,0,.18)] hover:-translate-x-[3px] hover:border-[#EDEDED]">
        <TransitionLink href={href}><IconArrowLeft stroke={1.8} />Back</TransitionLink>
      </Button>
      <StatusPill available={site.available} label={site.availabilityLabel} className="hidden @min-[520px]:inline-flex" />
    </div>
  );
}
