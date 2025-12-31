
'use client';

import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";
import Script from "next/script";

const videos = [
    { id: "cTlwhPnrhiM", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhjn", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhjV", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhji", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhjj", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhj1", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhjh", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhjf", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhjc", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhi8", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhiK", aspectRatio: "1.777778" },
    { id: "cTlwhPnrhiL", aspectRatio: "1.777778" },
];

function VideoEmbed({ id, aspectRatio }: { id: string; aspectRatio: string }) {
    // Force a 16:9 aspect ratio for uniform height
    const paddingTop = (9 / 16) * 100;
    return (
        <Card className="bg-card/50 overflow-hidden">
            <div
                className="sp-embed-player"
                data-id={id}
                style={{ position: 'relative', width: '100%', paddingTop: `${paddingTop}%`, height: 0 }}
            >
                <Script src={`https://go.screenpal.com/consumption/player_appearance/${id}/${aspectRatio}`}></Script>
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    scrolling="no"
                    src={`https://go.screenpal.com/player/${id}?ff=1&title=0`}
                    allowFullScreen={true}
                ></iframe>
            </div>
        </Card>
    );
}

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
            <VideoEmbed key={video.id} id={video.id} aspectRatio={video.aspectRatio} />
        ))}
      </div>

    </AnimatedSection>
  );
}
