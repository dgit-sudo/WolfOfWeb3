
import { AnimatedSection } from "@/components/layout/animated-section";
import { Megaphone } from "lucide-react";
import { VideoEmbed } from "@/components/ui/video-embed";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isScreenPalId, isVideoFilePath } from "@/lib/admin-content";
import { getAdminContentBySection } from "@/lib/admin-db";

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

export async function MarketingSection() {
  const adminItems = getAdminContentBySection("marketing");

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {marketingVideos.map((video, index) => (
            <div
                key={video.id + index}
                className={
                    marketingVideos.length % 3 === 1 && index === marketingVideos.length - 1
                    ? "lg:col-start-2"
                    : ""
                }
            >
                <VideoEmbed id={video.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Content coming soon.</p>
        </div>
      )}

      {adminItems.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-bold font-headline text-center">Admin Additions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {adminItems.map((item) => (
              <div key={item.id}>
                {item.type === "video" && isScreenPalId(item.url) ? (
                  <VideoEmbed id={item.url} />
                ) : item.type === "video" && isVideoFilePath(item.url) ? (
                  <Card className="bg-card/50 overflow-hidden border-border">
                    <video src={item.url} controls className="w-full aspect-video bg-black" />
                    <CardContent className="p-4">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ) : item.type === "video" ? (
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
                ) : (
                  <Card className="bg-card/50 border-border">
                    <CardContent className="p-5 space-y-3">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                      <Button asChild className="w-full">
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">Open Link</Link>
                      </Button>
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
