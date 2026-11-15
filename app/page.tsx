import { ContactSection } from "@/components/site/contact-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceSection } from "@/components/site/service-section";
import { WorkGrid } from "@/components/site/work-grid";
import { getContent } from "@/lib/content";

export const revalidate = 3600;

export default async function HomePage() {
  const { site, projects, services, experience, socials } = await getContent();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <main>
      <Hero site={site} socials={socials} />

      <section id="work" className="relative bg-mist pb-[clamp(80px,9cqw,130px)] pt-[clamp(56px,6cqw,90px)]">
        <SectionHeading ghost="PORTFOLIO" title="/SELECTED WORK" align="center" />
        <div className="mx-auto mt-[clamp(44px,6.4cqw,92px)] w-[min(1104px,calc(100%-40px))]">
          <WorkGrid projects={featured.length ? featured : projects.slice(0, 4)} showViewAll />
        </div>
      </section>

      <ServiceSection services={services} />
      <ExperienceSection items={experience} yearsLabel={site.yearsLabel} />
      <ContactSection site={site} socials={socials} />
    </main>
  );
}
