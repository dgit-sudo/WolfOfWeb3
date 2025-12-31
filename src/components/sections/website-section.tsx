
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Monitor, Brush, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const websiteProjects = [
  {
    title: "KalaSaarth",
    description: "A vibrant e-commerce platform dedicated to connecting artisans with a global audience, preserving cultural heritage through modern technology.",
    image: PlaceHolderImages.find(p => p.id === "website-project-kalasaarth"),
    metric: "Artisan Empowerment",
    link: "https://kalasaarthi.tech",
    status: "Live"
  },
  {
    title: "Ecotape",
    description: "A platform selling environment-friendly bandages to villagers and poor households across India, focusing on accessibility and social impact.",
    image: PlaceHolderImages.find(p => p.id === "website-project-ecotape"),
    metric: "Community Health",
    link: "https://ecotape.in",
    status: "Live"
  },
  {
    title: "Dropia",
    description: "A comprehensive, scalable, and self-hostable dropshipping platform that empowers entrepreneurs to easily set up and manage their online retail businesses.",
    image: PlaceHolderImages.find(p => p.id === "website-project-dropia"),
    metric: "E-commerce Automation",
    link: null,
    status: "Self-Hostable"
  }
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

      {websiteProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websiteProjects.map((project) => (
            <Card key={project.title} className="bg-card/50 border-border hover:border-primary transition-colors duration-300 overflow-hidden group flex flex-col">
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
              </CardHeader>
              <CardContent className="p-6 pb-4 flex-grow">
                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-foreground/80">{project.description}</CardDescription>
                <div className="flex items-center gap-2 text-accent font-bold mt-4">
                  <Brush className="h-5 w-5" />
                  <span>{project.metric}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                 {project.link ? (
                   <Button asChild className="w-full bg-primary/90 text-primary-foreground hover:bg-primary" >
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                   </Button>
                 ) : (
                   <div className="w-full flex flex-col items-center gap-2">
                     <Button className="w-full" disabled>
                        Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                     </Button>
                      {project.status && <Badge variant="secondary" className="mt-2">{project.status}</Badge>}
                   </div>
                 )}
              </CardFooter>
            </Card>
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

    