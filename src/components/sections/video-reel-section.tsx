
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Film, PlayCircle } from "lucide-react";
import { AIContentUpdater } from "../ai/ai-content-updater";

export function VideoReelSection() {
  const reelThumbnail = PlaceHolderImages.find(img => img.id === "video-reel-thumbnail");
  const currentContent = `This is the main showcase of my video editing skills, featuring a dynamic compilation of my best work across various genres including corporate videos, music videos, and short films.
Main Reel: Video Editing Showcase 2024`;
  return (
    <AnimatedSection id="video">
      <div className="absolute top-4 right-4">
        <AIContentUpdater sectionTitle="Video Editing" content={currentContent} />
      </div>
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent shadow-inner">
            <Film className="inline-block h-4 w-4 mr-2" />
            Video Editing
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Video Editing Reel</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Crafting compelling narratives through the art of motion and editing.
        </p>
      </div>
      
      {reelThumbnail && (
        <Card className="w-full max-w-4xl mx-auto overflow-hidden border-2 border-primary/50 hover:border-primary transition-all duration-300 shadow-[0_0_30px_-10px_hsl(var(--primary))]">
          <CardContent className="p-0 aspect-video relative group cursor-pointer">
            <Image
              src={reelThumbnail.imageUrl}
              alt={reelThumbnail.description}
              width={1280}
              height={720}
              className="w-full h-full object-cover"
              data-ai-hint={reelThumbnail.imageHint}
            />
            <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="h-20 w-20 text-white/70 transition-all duration-300 group-hover:text-white group-hover:scale-110 drop-shadow-lg" />
            </div>
          </CardContent>
        </Card>
      )}
    </AnimatedSection>
  );
}
