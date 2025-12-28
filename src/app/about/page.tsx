import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";


const teamMembers = [
  {
    name: "Alex 'The Wolf' Volkov",
    role: "Founder & Lead Strategist",
    bio: "With a decade of experience at the bleeding edge of digital, Alex orchestrates every project with a master's touch, ensuring groundbreaking results.",
    image: PlaceHolderImages.find(img => img.id === "marketing-campaign-1"),
  },
  {
    name: "Sasha 'The Visionary' Chen",
    role: "Head of Web3 Development",
    bio: "Sasha architects the decentralized future, building secure and scalable Web3 solutions that empower users and redefine digital ownership.",
    image: PlaceHolderImages.find(img => img.id === "web3-project-2"),
  },
   {
    name: "Leo 'The Animator' Petrov",
    role: "Lead Video Editor",
    bio: "Leo brings stories to life, transforming raw footage into cinematic experiences that captivate and convert.",
    image: PlaceHolderImages.find(img => img.id === "video-reel-thumbnail"),
  },
];


export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-background");
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="about">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-inner">
                <Users className="inline-block h-4 w-4 mr-2" />
                About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">We are The Wolf of Web3</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              We are a collective of digital pioneers, innovators, and storytellers dedicated to pushing the boundaries of what's possible on the web. Our mission is to forge the future of digital engagement.
            </p>
          </div>

          {heroImage && (
             <div className="relative w-full h-80 rounded-lg overflow-hidden mb-16">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
          )}

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">Our Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">Innovation</h3>
                    <p className="text-muted-foreground">We don't follow trends, we set them. We are constantly exploring new technologies and strategies to keep our clients ahead of the curve.</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-accent mb-2">Creativity</h3>
                    <p className="text-muted-foreground">Our work is our art. We craft bespoke digital experiences that are not only effective but also beautiful and memorable.</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">Results</h3>
                    <p className="text-muted-foreground">At the end of the day, it's all about impact. We are laser-focused on delivering measurable results that drive growth and success.</p>
                </div>
            </div>
          </div>

          <div>
             <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Meet the Pack</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.name} className="bg-card/50 border-border text-center">
                    <CardHeader className="items-center">
                      {member.image && (
                         <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50">
                           <Image
                              src={member.image.imageUrl}
                              alt={member.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                              data-ai-hint={member.image.imageHint}
                           />
                         </div>
                      )}
                      <CardTitle className="font-headline text-2xl pt-4">{member.name}</CardTitle>
                      <p className="text-primary font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>


        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
