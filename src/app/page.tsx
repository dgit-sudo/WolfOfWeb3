import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeValueSection } from "@/components/sections/home-value-section";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Development, Video Production, and Web3 Growth Agency",
  description:
    "The Wolf of Web3 helps brands scale with web development, video production, Web3 marketing, and conversion-focused strategy.",
  path: "/",
  keywords: ["web development agency", "video production agency", "web3 growth"],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HomeValueSection />
      </main>
      <Footer />
    </div>
  );
}
