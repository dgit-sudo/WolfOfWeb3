
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";

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
      
      <div className="text-center text-muted-foreground">
        <p>Videos coming soon. Please provide the embed codes.</p>
      </div>

    </AnimatedSection>
  );
}
