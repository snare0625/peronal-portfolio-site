import type { CSSProperties } from "react";
import {
  IconArrowUpRight,
  IconBrandBehance,
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { Social } from "@/lib/types";

const ICONS = {
  dribbble: IconBrandDribbble,
  instagram: IconBrandInstagram,
  linkedin: IconBrandLinkedin,
  behance: IconBrandBehance,
  x: IconBrandX,
  github: IconBrandGithub,
};

export function SocialPill({ social, className, style }: { social: Social; className?: string; style?: CSSProperties }) {
  const Icon = ICONS[social.icon] ?? IconArrowUpRight;
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      style={style}
      className={cn(
        "inline-flex h-pill items-center gap-2.5 rounded-full border border-[#ECECEC] bg-paper pl-[clamp(13px,1.15cqw,16px)] pr-[clamp(16px,1.7cqw,24px)] text-[length:clamp(13px,1.2cqw,17px)] font-semibold text-[#1E1E1E] transition-[translate,border-color] duration-300 ease-out-soft hover:border-[#CFCFCF]",
        className
      )}
    >
      <Icon className="size-[1.25em]" stroke={1.6} />
      {social.label}
    </a>
  );
}
