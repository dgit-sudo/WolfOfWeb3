
'use client';

import { AnimatedSection } from "@/components/layout/animated-section";
import { Film } from "lucide-react";
import { VideoEmbed } from "@/components/ui/video-embed";

const videos = [
    { id: "cTlwhPnrhiM" },
    { id: "cTlwhPnrhjn" },
    { id: "cTlwhPnrhjV" },
    { id: "cTlwhPnrhji" },
    { id: "cTlwhPnrhjj" },
    { id: "cTlwhPnrhj1" },
    { id: "cTlwhPnrhjh" },
    { id: "cTlwhPnrhjf" },
    { id: "cTlwhPnrhjc" },
    { id: "cTlwhPnrhi8" },
    { id: "cTlwhPnrhiK" },
    { id: "cTlwhPnrhiL" },
];

export function VideoReelSection() {
  return (
    <AnimatedSection id="video">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent shadow-inner">
            <Film className="inline-block h-4 w-4 mr-2" />
            Video Production
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Video Showcase</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Crafting compelling narratives through the art of motion and editing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
            <VideoEmbed key={video.id} id={video.id} />
        ))}
      </div>

    </AnimatedSection>
  );
}
