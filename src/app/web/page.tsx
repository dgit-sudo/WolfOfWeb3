import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebsiteSection } from "@/components/sections/website-section";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Development and Website Design",
  description:
    "See website projects focused on performance, UX, conversion optimization, and scalable web development.",
  path: "/web",
  keywords: ["web development", "website design", "landing page optimization"],
});

export default function WebPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <WebsiteSection />
      </main>
      <Footer />
    </div>
  );
}
