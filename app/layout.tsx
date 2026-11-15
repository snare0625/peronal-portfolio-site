import type { Metadata, Viewport } from "next";
import { Inter_Tight, Manrope, Montserrat } from "next/font/google";
import { PageTransition } from "@/components/site/page-transition";
import { ShowcaseFrame } from "@/components/site/showcase-frame";
import { Toaster } from "@/components/ui/sonner";
import { getContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  const title = site.displayName + " — " + site.role;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: "%s — " + site.displayName },
    description: site.tagline,
    // Explicit so every route inherits the generated preview card (app/opengraph-image.tsx).
    openGraph: { title, description: site.tagline, type: "website", url: "/", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description: site.tagline, images: ["/twitter-image"] },
  };
}

export const viewport: Viewport = { themeColor: "#F6F6F6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={[manrope.variable, montserrat.variable, interTight.variable].join(" ")}>
      <body>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <ShowcaseFrame showcase={siteConfig.showcase}>
          <PageTransition>{children}</PageTransition>
        </ShowcaseFrame>
        <Toaster />
      </body>
    </html>
  );
}
