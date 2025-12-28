
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Monitor, Server, Brush } from "lucide-react";

const websiteProjects = [
  {
    title: "E-commerce Platform 'StyleSphere'",
    description: "Built a fully responsive e-commerce site with Next.js, resulting in a 30% increase in conversions.",
    image: PlaceHolderImages.find(img => img.id === "website-project-1"),
    metric: "Next.js",
  },
  {
    title: "SaaS Dashboard 'Analytica'",
    description: "Designed and developed a data-intensive dashboard for a SaaS product, improving user engagement by 25%.",
    image: PlaceHolderImages.find(img => img.id === "website-project-2"),
    metric: "React",
  },
  {
    title: "Creative Agency Portfolio 'Vizualize'",
    description: "Created a visually stunning portfolio site with complex animations and a headless CMS.",
    image: PlaceHolderImages.find(img => img.id === "website-project-3"),
    metric: "GSAP",
  },
];

export function WebsiteSection() {
  return (
    <AnimatedSection id="web">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent shadow-inner">
            <Monitor className="inline-block h-4 w-4 mr-2" />
            Web Development
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Website Showcase</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Creating performant, elegant, and user-friendly web experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {websiteProjects.map((project) => (
          <Card key={project.title} className="bg-card/50 border-border hover:border-primary transition-colors duration-300 overflow-hidden group">
            <CardHeader className="p-0">
              {project.image && (
                <div className="aspect-video overflow-hidden">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={project.image.imageHint}
                    />
                </div>
              )}
              <div className="p-6 pb-2">
                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-foreground/80">{project.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <div className="flex items-center gap-2 text-accent font-bold">
                <Brush className="h-5 w-5" />
                <span>{project.metric}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}
