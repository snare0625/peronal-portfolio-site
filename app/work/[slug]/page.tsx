import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IconArrowUpRight, IconBrandGithub, IconPlus } from "@tabler/icons-react";
import { ContactSection } from "@/components/site/contact-section";
import { Media } from "@/components/site/media";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { TopBar } from "@/components/site/top-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getContent, getProject } from "@/lib/content";
import { cn, delay } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    // A child openGraph object replaces the parent's, so fall back to the site card explicitly.
    openGraph: { images: [project.coverUrl ?? "/opengraph-image"] },
  };
}

const isVideo = (src: string) => /\.(mp4|webm|mov)(\?|#|$)/i.test(src);

/** Video keeps its own aspect ratio (no crop). Muted autoplay loop; controls let visitors unmute. */
function VideoFrame({ src, label }: { src: string; label: string }) {
  return (
    <div className="mx-auto w-[min(760px,100%)] rounded-2xl border border-[#E2E2E2] bg-white/45 p-[clamp(10px,1.7cqw,24px)]">
      <video src={src} aria-label={label} controls autoPlay muted loop playsInline preload="auto" className="block h-auto w-full rounded-[4px] bg-[#1C1C1C]" />
    </div>
  );
}

function Frame({ src, label, alt, wide = false }: { src: string | null; label: string; alt: string; wide?: boolean }) {
  if (src && isVideo(src)) return <VideoFrame src={src} label={alt} />;
  return (
    <div className="rounded-2xl border border-[#E2E2E2] bg-white/45 p-[clamp(10px,1.7cqw,24px)]">
      <div className={cn("relative overflow-hidden rounded-[4px] bg-[#1C1C1C]", wide ? "aspect-video" : "aspect-[16/10]")}>
        {/* Anchored top-left so app screenshots keep their header and sidebar when cropped */}
        <Media src={src} alt={alt} label={label} sizes="(min-width: 1280px) 1152px, 100vw" className="object-left-top" />
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [{ site, projects, socials }, project] = await Promise.all([getContent(), getProject(slug)]);
  if (!project) notFound();

  // Image frames only render for real images; text-only projects lead with the note + highlights.
  const [first, ...rest] = project.gallery;
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main>
      <section className="relative bg-sheen pb-[clamp(70px,8cqw,120px)]">
        <TopBar site={site} />

        <div className="px-[clamp(20px,11cqw,160px)] pt-[clamp(40px,6.2cqw,90px)]">
          <div style={delay(150)} className="intro flex flex-wrap gap-3">
            {project.tags.map((t) => <Badge key={t} variant="chip-light">{t}</Badge>)}
          </div>
          <div style={delay(250)} className="intro mt-[clamp(22px,2.6cqw,36px)] flex flex-wrap items-baseline gap-x-[clamp(14px,1.8cqw,26px)] gap-y-1">
            <h1 className="text-case font-semibold leading-[1.05] tracking-[-.02em] text-ink">{project.name}</h1>
            <span className="text-[length:clamp(18px,2cqw,29px)] font-normal text-[#4A4A4A]">/{project.type}</span>
          </div>
          <p style={delay(350)} className="intro mt-[clamp(20px,2.4cqw,34px)] max-w-[540px] text-pretty text-ui leading-[1.6] text-[#5A5A5A]">{project.summary}</p>
          {project.role && (
            <p style={delay(400)} className="intro mt-[clamp(12px,1.4cqw,20px)] text-ui text-[#5A5A5A]">
              <span className="font-semibold text-ink">Role</span> · {project.role}
            </p>
          )}
          <div style={delay(450)} className="intro mt-[clamp(28px,3.4cqw,48px)] flex flex-wrap gap-[18px]">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">Live Site<IconArrowUpRight stroke={1.8} /></a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant={project.liveUrl ? "outline" : "default"} className={project.liveUrl ? "border-[#EAEAEA] text-[#262626]" : undefined}>
                <a href={project.repoUrl} target="_blank" rel="noreferrer">View Code<IconBrandGithub stroke={1.8} /></a>
              </Button>
            )}
            <Button asChild variant="outline" className="border-[#EAEAEA] text-[#262626]">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-[clamp(56px,7cqw,100px)] flex w-[min(1152px,calc(100%-40px))] flex-col gap-[clamp(32px,3.6cqw,52px)]">
          {first && (
            <div style={delay(600)} className="intro">
              <Frame src={first} alt={project.title} label="Case study · hero shot" />
            </div>
          )}
          {project.note && (
            <Reveal className="mx-auto w-[min(980px,100%)]">
              <p className="text-pretty rounded-[14px] border border-[#DADADA] p-[clamp(16px,1.8cqw,26px)] text-note font-medium leading-[1.38] text-[#2A2A2A]">{project.note}</p>
            </Reveal>
          )}
          {project.highlights.length > 0 && (
            <div className="mx-auto w-[min(980px,100%)]">
              <Reveal>
                <h2 className="font-title text-[length:clamp(26px,3cqw,44px)] font-medium leading-none tracking-[-.025em] text-ink">/HIGHLIGHTS</h2>
              </Reveal>
              <div className="mt-[clamp(20px,2.6cqw,38px)]">
                {project.highlights.map((h, i) => (
                  <Reveal key={h.label} delay={i * 90}>
                    <div className="grid gap-x-10 gap-y-2 border-t border-[#DADADA] py-[clamp(18px,2.2cqw,30px)] @min-[700px]:grid-cols-[minmax(150px,.3fr)_1fr]">
                      <h3 className="font-title text-[length:clamp(19px,1.8cqw,26px)] font-medium leading-[1.25] tracking-[-.015em] text-ink">{h.label}</h3>
                      <p className="text-pretty text-ui leading-[1.65] text-[#4A4A4A]">{h.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
          {project.prompts && project.prompts.length > 0 && (
            <div className="mx-auto w-[min(980px,100%)]">
              <Reveal>
                <h2 className="font-title text-[length:clamp(26px,3cqw,44px)] font-medium leading-none tracking-[-.025em] text-ink">/PROMPTS</h2>
              </Reveal>
              <div className="mt-[clamp(20px,2.6cqw,38px)] grid gap-3">
                {project.prompts.map((p, i) => (
                  <Reveal key={p.label} delay={i * 90}>
                    <details className="group rounded-[14px] border border-[#DADADA] bg-white/50 transition-colors open:bg-white/85">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[14px] px-[clamp(16px,1.8cqw,26px)] py-[clamp(14px,1.5cqw,20px)] font-title text-[length:clamp(17px,1.6cqw,22px)] font-medium leading-[1.3] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                        {p.label}
                        <IconPlus aria-hidden stroke={1.6} className="size-5 shrink-0 text-[#8A8A8A] transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <p className="whitespace-pre-line border-t border-[#E4E4E4] px-[clamp(16px,1.8cqw,26px)] py-[clamp(14px,1.6cqw,22px)] font-mono text-[13px] leading-[1.75] text-[#3A3A3A]">{p.text}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
          {rest.map((src, i) => (
            <Reveal key={src}>
              <Frame src={src} alt={project.title} label={"Case study · section " + (i + 2)} wide={i === rest.length - 1} />
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <>
            <div className="mx-auto mt-[clamp(56px,7cqw,100px)] w-[min(1152px,calc(100%-40px))] border-t border-dashed border-[#D4D4D4]" />
            <Reveal>
              <h2 className="mt-[clamp(48px,5.5cqw,80px)] text-center font-title text-[length:clamp(28px,3.4cqw,50px)] font-medium leading-none tracking-[-.025em] text-ink">/MORE WORK</h2>
            </Reveal>
            <div className="mx-auto mt-[clamp(32px,4cqw,56px)] grid w-[min(1010px,calc(100%-40px))] grid-cols-[repeat(auto-fill,minmax(min(100%,360px),1fr))] gap-[clamp(20px,2.4cqw,34px)]">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 120}>
                  <ProjectCard project={p} compact />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      <ContactSection site={site} socials={socials} />
    </main>
  );
}
