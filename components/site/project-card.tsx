import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { Media } from "./media";
import { TransitionLink } from "./transition-link";

const MAX_TAGS = 3;

/** Typographic cover for projects without a screenshot: charcoal panel, project name and role. */
function TextCover({ name, role }: { name: string; role: string | null }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-[clamp(6px,.7cqw,10px)] bg-charcoal p-[clamp(18px,2.2cqw,32px)] transition-colors duration-[450ms] group-hover:bg-charcoal-hi">
      <span className="text-balance font-title text-[length:clamp(26px,3.1cqw,44px)] font-medium leading-[1.02] tracking-[-.025em] text-white">{name}</span>
      {role && <span className="text-[length:clamp(13px,1.1cqw,16px)] font-medium text-faint">{role}</span>}
    </div>
  );
}

/** 5px white mat around a 1.41 thumbnail, #F4F4F4 body, soft shadow; lifts 6px on hover. */
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const shown = project.tags.slice(0, MAX_TAGS);
  const extra = project.tags.length - shown.length;
  return (
    <TransitionLink
      href={"/work/" + project.slug}
      className="group flex h-full flex-col border border-[#FAFAFA] bg-[#F4F4F4] shadow-tile outline-none transition-[translate,box-shadow] duration-[450ms] ease-out-soft hover:-translate-y-1.5 hover:shadow-tile-hover focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="bg-paper p-[5px]">
        <div className="relative aspect-[1.41] overflow-hidden bg-[#E9E9E9]">
          {project.coverUrl ? (
            <Media src={project.coverUrl} alt={project.title} label={project.name + " · cover"} sizes="(min-width: 1024px) 540px, 100vw" className="object-left-top" />
          ) : (
            <TextCover name={project.name} role={project.role} />
          )}
          <Badge variant="label" className="absolute left-3 top-3">{project.type}</Badge>
        </div>
      </div>
      <div className={cn(compact ? "px-[clamp(14px,1.25cqw,18px)] pb-[clamp(20px,2cqw,28px)] pt-[clamp(14px,1.4cqw,20px)]" : "px-[clamp(14px,1.25cqw,18px)] pb-[clamp(22px,2.2cqw,32px)] pt-[clamp(16px,1.6cqw,22px)]")}>
        <h3 className={cn("text-pretty font-medium leading-[1.42] text-[#3A3A3A]", compact ? "text-[length:clamp(17px,1.6cqw,23px)]" : "text-card-title")}>
          {project.title}
        </h3>
        <div className={cn("flex flex-wrap", compact ? "mt-3 gap-2.5" : "mt-[clamp(12px,1.1cqw,16px)] gap-3")}>
          {shown.map((t) => (
            <Badge key={t} className={compact ? "h-[38px] px-3.5 text-sm" : undefined}>{t}</Badge>
          ))}
          {extra > 0 && (
            <Badge className={cn("text-[#7A7A7A]", compact && "h-[38px] px-3.5 text-sm")}>+{extra}</Badge>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
