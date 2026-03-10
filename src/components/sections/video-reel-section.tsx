import { AnimatedSection } from "@/components/layout/animated-section";
import { Film } from "lucide-react";
import { VideoEmbed } from "@/components/ui/video-embed";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { isScreenPalId, isVideoFilePath } from "@/lib/admin-content";
import { getAdminContentBySection } from "@/lib/admin-db";

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

export async function VideoReelSection() {
  const adminItems = getAdminContentBySection("video");

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

      {adminItems.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-bold font-headline text-center">Admin Additions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminItems.map((item) => (
              <div key={item.id}>
                {isScreenPalId(item.url) ? (
                  <VideoEmbed id={item.url} />
                ) : isVideoFilePath(item.url) ? (
                  <Card className="bg-card/50 overflow-hidden border-border">
                    <video src={item.url} controls className="w-full aspect-video bg-black" />
                    <CardContent className="p-4">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-card/50 overflow-hidden border-border">
                    <div className="aspect-video">
                      <iframe
                        src={item.url}
                        title={item.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
