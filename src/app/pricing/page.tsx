import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingSection } from "@/components/sections/pricing-section";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing Plans for Web, Video, and Growth Services",
  description:
    "Compare Foundation, Momentum, and Dominance retainer plans for web development, video production, paid ads, and growth strategy.",
  path: "/pricing",
  keywords: ["agency pricing", "web development pricing", "video production pricing"],
});

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}