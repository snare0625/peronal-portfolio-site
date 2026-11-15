const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? "https://" + vercelUrl : "http://localhost:3000"),
  // Off unless explicitly enabled: plain full-width site by default.
  showcase: process.env.NEXT_PUBLIC_SHOWCASE_FRAME === "true",
};
