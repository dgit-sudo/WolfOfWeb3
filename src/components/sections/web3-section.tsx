
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Code, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAdminContentBySection } from "@/lib/admin-db";

const web3Projects = [
  {
    title: "DeFiChain Staking Protocol",
    description: "A secure and decentralized staking platform offering high-yield returns on various crypto assets. Built with a focus on security and user-owned governance.",
    image: PlaceHolderImages.find(p => p.id === "web3-project-defi"),
    tags: ["DeFi", "Staking", "Ethereum", "Solidity"]
  },
  {
    title: "Artify NFT Marketplace",
    description: "A curated marketplace for digital artists to mint and sell their unique creations as NFTs. Featuring low gas fees and a vibrant community.",
    image: PlaceHolderImages.find(p => p.id === "web3-project-nft"),
    tags: ["NFT", "Marketplace", "Digital Art", "Polygon"]
  },
  {
    title: "GovernDAO",
    description: "An all-in-one platform for creating and managing Decentralized Autonomous Organizations (DAOs). Empower your community with transparent voting and proposal systems.",
    image: PlaceHolderImages.find(p => p.id === "web3-project-dao"),
    tags: ["DAO", "Governance", "Smart Contracts", "Aragon"]
  }
];

export async function Web3Section() {
  const adminItems = getAdminContentBySection("web3");

  return (
    <AnimatedSection id="web3" className="bg-secondary/30">
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

      {web3Projects.length > 0 ? (
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
                          {project.tags.map((tag: any) => (
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
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Content coming soon.</p>
        </div>
      )}

      {adminItems.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-bold font-headline text-center">Admin Additions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminItems.map((item) => (
              <Card key={item.id} className="bg-card/50 border-border hover:border-accent transition-colors duration-300 overflow-hidden flex flex-col">
                {item.thumbnailUrl ? (
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </CardHeader>
                ) : null}
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-foreground/80 flex-grow">{item.description}</CardDescription>
                  {item.tags && item.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-accent text-accent">{tag}</Badge>
                      ))}
                    </div>
                  ) : null}
                  <Button asChild className="mt-6 w-full">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">Open Project</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
