import "server-only";
import { cache } from "react";
import { seed } from "@/content/seed";
import { getSupabase, storageUrl } from "@/lib/supabase/server";
import type { Experience, Highlight, Project, ProjectType, Service, SiteContent, SiteSettings, Social, SocialIcon } from "@/lib/types";

type SiteRow = {
  first_name: string; last_name: string; display_name: string; role: string; tagline: string;
  available: boolean; availability_label: string; years_label: string; email: string;
  portrait_url: string | null; avatar_url: string | null; cv_url: string | null; cta_title: string; cta_body: string;
  work_count: string; service_count: string; experience_count: string;
};
type ProjectRow = {
  slug: string; type: ProjectType; name: string; title: string; tags: string[] | null; summary: string; note: string;
  role: string | null; highlights: Highlight[] | null; prompts: Highlight[] | null; cover_url: string | null; gallery: string[] | null; live_url: string | null; repo_url: string | null; featured: boolean;
};
type ServiceRow = { title: string; description: string; preview_url: string | null };
type ExperienceRow = { company: string; role: string; period: string; summary: string | null; preview_url: string | null };
type SocialRow = { label: string; href: string; icon: SocialIcon };

const mapSite = (r: SiteRow): SiteSettings => ({
  firstName: r.first_name,
  lastName: r.last_name,
  displayName: r.display_name,
  role: r.role,
  tagline: r.tagline,
  available: r.available,
  availabilityLabel: r.availability_label,
  yearsLabel: r.years_label,
  email: r.email,
  portraitUrl: storageUrl(r.portrait_url),
  avatarUrl: storageUrl(r.avatar_url),
  cvUrl: storageUrl(r.cv_url),
  ctaTitle: r.cta_title,
  ctaBody: r.cta_body,
  counts: { work: r.work_count, service: r.service_count, experience: r.experience_count },
});

const mapProject = (r: ProjectRow): Project => ({
  slug: r.slug,
  type: r.type,
  name: r.name,
  title: r.title,
  tags: r.tags ?? [],
  summary: r.summary,
  note: r.note,
  role: r.role,
  highlights: r.highlights ?? [],
  prompts: r.prompts ?? [],
  coverUrl: storageUrl(r.cover_url),
  gallery: (r.gallery ?? []).map((g) => storageUrl(g)).filter((g): g is string => Boolean(g)),
  liveUrl: r.live_url,
  repoUrl: r.repo_url,
  featured: r.featured,
});

/** Nav counts for Work and Skills follow the real content, so they never drift. */
const withCounts = (c: SiteContent): SiteContent => ({
  ...c,
  site: { ...c.site, counts: { ...c.site.counts, work: String(c.projects.length), service: String(c.services.length) } },
});

/** All page content. Supabase when configured, otherwise content/seed.ts. Deduped per request. */
export const getContent = cache(async (): Promise<SiteContent> => withCounts(await load()));

async function load(): Promise<SiteContent> {
  const sb = getSupabase();
  if (!sb) return seed;
  try {
    const [site, projects, services, experience, socials] = await Promise.all([
      sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      sb.from("projects").select("*").eq("published", true).order("sort"),
      sb.from("services").select("*").order("sort"),
      sb.from("experience").select("*").order("sort"),
      sb.from("socials").select("*").order("sort"),
    ]);
    const error = site.error || projects.error || services.error || experience.error || socials.error;
    if (error) throw error;

    const siteRow = site.data as SiteRow | null;
    const projectRows = (projects.data ?? []) as ProjectRow[];
    const serviceRows = (services.data ?? []) as ServiceRow[];
    const experienceRows = (experience.data ?? []) as ExperienceRow[];
    const socialRows = (socials.data ?? []) as SocialRow[];

    return {
      site: siteRow ? mapSite(siteRow) : seed.site,
      projects: projectRows.length ? projectRows.map(mapProject) : seed.projects,
      services: serviceRows.length
        ? serviceRows.map((r): Service => ({ title: r.title, description: r.description, previewUrl: storageUrl(r.preview_url) }))
        : seed.services,
      experience: experienceRows.length
        ? experienceRows.map((r): Experience => ({ company: r.company, role: r.role, period: r.period, summary: r.summary, previewUrl: storageUrl(r.preview_url) }))
        : seed.experience,
      socials: socialRows.length ? socialRows.map((r): Social => ({ label: r.label, href: r.href, icon: r.icon })) : seed.socials,
    };
  } catch (err) {
    console.error("[content] Supabase fetch failed — falling back to seed content.", err);
    return seed;
  }
}

export async function getProject(slug: string) {
  const { projects } = await getContent();
  return projects.find((p) => p.slug === slug) ?? null;
}
