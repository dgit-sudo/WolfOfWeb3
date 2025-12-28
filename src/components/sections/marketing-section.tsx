
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Megaphone, TrendingUp, Users } from "lucide-react";
import { AIContentUpdater } from "../ai/ai-content-updater";

const caseStudies = [
  {
    title: "Project Phoenix: Viral Launch",
    description: "Achieved 10M+ impressions in 30 days through a multi-channel viral marketing strategy.",
    image: PlaceHolderImages.find(img => img.id === "marketing-campaign-1"),
    metric: "+500% ROI",
  },
  {
    title: "QuantumLeap: Community Growth",
    description: "Grew an online community from 0 to 100k members in 6 months using targeted content and engagement tactics.",
    image: PlaceHolderImages.find(img => img.id === "marketing-campaign-2"),
    metric: "100k+ Members",
  },
  {
    title: "NovaCore: Brand Repositioning",
    description: "Successfully repositioned a legacy brand for a millennial audience, boosting sales by 40%.",
    image: PlaceHolderImages.find(img => img.id === "marketing-campaign-3"),
    metric: "+40% Sales",
  },
];

export function MarketingSection() {
  const currentContent = `
Description: Achieved 10M+ impressions in 30 days through a multi-channel viral marketing strategy.
Project Title: Project Phoenix: Viral Launch

Description: Grew an online community from 0 to 100k members in 6 months using targeted content and engagement tactics.
Project Title: QuantumLeap: Community Growth

Description: Successfully repositioned a legacy brand for a millennial audience, boosting sales by 40%.
Project Title: NovaCore: Brand Repositioning
`;
  return (
    <AnimatedSection id="marketing">
      <div className="absolute top-4 right-4">
        <AIContentUpdater sectionTitle="Marketing" content={currentContent} />
      </div>
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent shadow-inner">
            <Megaphone className="inline-block h-4 w-4 mr-2" />
            Marketing
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Marketing Case Studies</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Driving results through strategic and innovative marketing campaigns.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {caseStudies.map((study) => (
          <Card key={study.title} className="bg-card/50 border-border hover:border-primary transition-colors duration-300 overflow-hidden group">
            <CardHeader className="p-0">
              {study.image && (
                <div className="aspect-video overflow-hidden">
                    <Image
                      src={study.image.imageUrl}
                      alt={study.image.description}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={study.image.imageHint}
                    />
                </div>
              )}
              <div className="p-6 pb-2">
                <CardTitle className="font-headline text-xl">{study.title}</CardTitle>
                <CardDescription className="mt-2 text-foreground/80">{study.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <div className="flex items-center gap-2 text-accent font-bold">
                <TrendingUp className="h-5 w-5" />
                <span>{study.metric}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}
