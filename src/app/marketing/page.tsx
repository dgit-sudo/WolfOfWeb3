import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MarketingSection } from "@/components/sections/marketing-section";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Marketing Video Services",
  description:
    "Browse marketing video content and campaign assets created to improve conversion, retention, and brand visibility.",
  path: "/marketing",
  keywords: ["marketing videos", "campaign video production", "brand growth marketing"],
});

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <MarketingSection />
      </main>
      <Footer />
    </div>
  );
}
