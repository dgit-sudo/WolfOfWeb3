
import { AnimatedSection } from "@/components/layout/animated-section";
import { Megaphone } from "lucide-react";
import { VideoEmbed } from "@/components/ui/video-embed";

const marketingVideos = [
    { id: "cTlwhPnrhis" },
    { id: "cTlwhPnrhiR" },
    { id: "cTlwhPnrhi9" },
    { id: "cTlwhPnrhiW" },
    { id: "cTlwhPnrhid" },
    { id: "cTlwhPnrhi7" },
    { id: "cTlwhPnrhiN" },
    { id: "cTlwhPnrhiP" },
    { id: "cTlwhPnrhiS" },
];

export function MarketingSection() {
  return (
    <AnimatedSection id="marketing">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent shadow-inner">
            <Megaphone className="inline-block h-4 w-4 mr-2" />
            Marketing
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Marketing Showcase</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Driving results through strategic and innovative marketing campaigns.
        </p>
      </div>

      {marketingVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingVideos.map((video) => (
            <VideoEmbed key={video.id} id={video.id} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Content coming soon.</p>
        </div>
      )}
    </AnimatedSection>
  );
}
