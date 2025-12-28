import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { MarketingSection } from "@/components/sections/marketing-section";
import { Web3Section } from "@/components/sections/web3-section";
import { WebsiteSection } from "@/components/sections/website-section";
import { VideoReelSection } from "@/components/sections/video-reel-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <MarketingSection />
        <Web3Section />
        <WebsiteSection />
        <VideoReelSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
