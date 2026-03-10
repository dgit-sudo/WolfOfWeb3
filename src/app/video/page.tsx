import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VideoReelSection } from "@/components/sections/video-reel-section";

export const dynamic = "force-dynamic";

export default function VideoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <VideoReelSection />
      </main>
      <Footer />
    </div>
  );
}
