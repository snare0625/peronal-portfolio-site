import type { Metadata } from "next";
import { ContactSection } from "@/components/site/contact-section";
import { SectionHeading } from "@/components/site/section-heading";
import { TopBar } from "@/components/site/top-bar";
import { WorkGrid } from "@/components/site/work-grid";
import { getContent } from "@/lib/content";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Work" };

export default async function WorkPage() {
  const { site, projects, socials } = await getContent();
  return (
    <main>
      <section className="relative bg-mist pb-[clamp(80px,9cqw,130px)]">
        <TopBar site={site} />
        <div className="pt-[clamp(32px,4cqw,60px)]">
          <SectionHeading ghost="PORTFOLIO" title="/ALL WORK" align="center" />
        </div>
        <div className="mx-auto mt-[clamp(44px,6.4cqw,92px)] w-[min(1104px,calc(100%-40px))]">
          <WorkGrid projects={projects} />
        </div>
      </section>
      <ContactSection site={site} socials={socials} />
    </main>
  );
}
