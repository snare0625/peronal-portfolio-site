/** Display order of the work filter tabs; only types that have projects get a tab. */
export const PROJECT_TYPES = ["Professional", "Freelance", "Personal", "Exploration"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type SocialIcon = "dribbble" | "instagram" | "linkedin" | "behance" | "x" | "github";

export interface SiteSettings {
  firstName: string; // outlined word in the hero
  lastName: string; // solid word in the hero
  displayName: string; // used in metadata + footer name pill
  role: string;
  tagline: string;
  available: boolean;
  availabilityLabel: string;
  yearsLabel: string;
  email: string;
  portraitUrl: string | null;
  avatarUrl: string | null;
  cvUrl: string | null; // PDF in /public (e.g. "/cv.pdf") or full URL; null hides "Download CV"
  ctaTitle: string;
  ctaBody: string;
  counts: { work: string; service: string; experience: string }; // work + service are computed from content; experience is shown as typed
}

export interface Highlight {
  label: string; // e.g. "Architecture"
  text: string;
}

export interface Project {
  slug: string;
  type: ProjectType;
  name: string;
  title: string;
  tags: string[]; // tech stack; cards show the first few, the case study shows all
  summary: string;
  note: string;
  role: string | null; // e.g. "Lead developer"
  highlights: Highlight[]; // case-study rows; replace screenshots when there are none
  prompts?: Highlight[]; // optional /PROMPTS section, shown verbatim (e.g. AI explorations)
  coverUrl: string | null;
  gallery: string[];
  liveUrl: string | null;
  repoUrl: string | null; // public source code; null hides "View Code"
  featured: boolean;
}

export interface Service {
  title: string;
  description: string;
  previewUrl: string | null;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string | null; // one or two lines under the role
  previewUrl: string | null;
}

export interface Social {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface SiteContent {
  site: SiteSettings;
  projects: Project[];
  services: Service[];
  experience: Experience[];
  socials: Social[];
}
