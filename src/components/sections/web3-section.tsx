
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Code, Share2 } from "lucide-react";
import { AIContentUpdater } from "../ai/ai-content-updater";

const web3Projects = [
  {
    title: "DeFi Protocol 'Aetherium'",
    description: "A decentralized lending protocol on Ethereum, enabling users to lend and borrow digital assets seamlessly.",
    image: PlaceHolderImages.find(img => img.id === "web3-project-1"),
    tags: ["DeFi", "Ethereum", "Smart Contracts"],
  },
  {
    title: "NFT Marketplace 'Chroma'",
    description: "A curated platform for digital artists to mint and sell their creations as unique NFTs.",
    image: PlaceHolderImages.find(img => img.id === "web3-project-2"),
    tags: ["NFTs", "Marketplace", "IPFS"],
  },
  {
    title: "DAO Governance 'Agora'",
    description: "A flexible and secure framework for creating and managing Decentralized Autonomous Organizations.",
    image: PlaceHolderImages.find(img => img.id === "web3-project-3"),
    tags: ["DAO", "Governance", "Solidity"],
  },
];

export function Web3Section() {
    const currentContent = `
Description: A decentralized lending protocol on Ethereum, enabling users to lend and borrow digital assets seamlessly.
Project Title: DeFi Protocol 'Aetherium'

Description: A curated platform for digital artists to mint and sell their creations as unique NFTs.
Project Title: NFT Marketplace 'Chroma'

Description: A flexible and secure framework for creating and managing Decentralized Autonomous Organizations.
Project Title: DAO Governance 'Agora'
`;
  return (
    <AnimatedSection id="web3" className="bg-secondary/30">
        <div className="absolute top-4 right-4">
            <AIContentUpdater sectionTitle="Web3" content={currentContent} />
        </div>
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-inner">
            <Share2 className="inline-block h-4 w-4 mr-2" />
            Web3
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Web3 Project Gallery</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Building the future of the decentralized web, one block at a time.
        </p>
      </div>

      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {web3Projects.map((project) => (
            <CarouselItem key={project.title} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="h-full flex flex-col bg-card/50 border-border hover:border-accent transition-colors duration-300">
                  <CardHeader className="p-0">
                    {project.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={project.image.imageUrl}
                          alt={project.image.description}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                          data-ai-hint={project.image.imageHint}
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                    <CardDescription className="mt-2 text-foreground/80 flex-grow">{project.description}</CardDescription>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="border-accent text-accent">{tag}</Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 hidden sm:flex" />
        <CarouselNext className="mr-12 hidden sm:flex" />
      </Carousel>
    </AnimatedSection>
  );
}
