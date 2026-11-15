"use client";

import { useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROJECT_TYPES, type Project, type ProjectType } from "@/lib/types";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";
import { TransitionLink } from "./transition-link";

type Filter = "All" | ProjectType;

/**
 * Tabs only for project types that are present (no empty "Freelance" tab).
 * Filter tabs re-key the grid, so cards re-run their rise-and-fade reveal on every switch.
 */
export function WorkGrid({ projects, showViewAll = false }: { projects: Project[]; showViewAll?: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const types = PROJECT_TYPES.filter((t) => projects.some((p) => p.type === t));
  const filters: Filter[] = types.length > 1 ? ["All", ...types] : [];
  const list = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <Reveal delay={80}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Filter work" className="flex gap-[clamp(20px,2.4cqw,34px)]">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "cursor-pointer py-1.5 text-ui font-semibold transition-colors duration-300",
                  filter === f ? "text-ink" : "text-[#6E6E6E] hover:text-ink"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          {showViewAll && (
            <Button asChild variant="outline" className="shadow-[0_1px_2px_rgba(0,0,0,.04)]">
              <TransitionLink href="/work">View All Work<IconArrowUpRight stroke={1.8} /></TransitionLink>
            </Button>
          )}
        </div>
      </Reveal>

      <div
        key={filter}
        className="mt-[clamp(28px,3.3cqw,48px)] grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[clamp(24px,3.75cqw,54px)]"
      >
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 120}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
        {!list.length && <p className="py-10 text-ui text-muted-foreground">Nothing here yet.</p>}
      </div>
    </>
  );
}
