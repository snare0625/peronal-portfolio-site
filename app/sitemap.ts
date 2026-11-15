import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getContent();
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now },
    { url: siteConfig.url + "/work", lastModified: now },
    ...projects.map((p) => ({ url: siteConfig.url + "/work/" + p.slug, lastModified: now })),
  ];
}
