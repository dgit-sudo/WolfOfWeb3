
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Users, Briefcase, Video, Mic, Share2, TrendingUp, Brush, Code, BookOpen, Brain, Target, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    title: "AI Video Production",
    icon: Video,
    items: ["AI-generated brand & promo videos", "Explainer & marketing videos", "Short-form Reels, TikTok & X"]
  },
  {
    title: "Camera Video Production",
    icon: Briefcase,
    items: ["Brand commercials & promos", "Product shoots & demos", "Lifestyle & campaign videos", "Event & BTS coverage"]
  },
  {
    title: "Marketing Interviews",
    icon: Mic,
    items: ["Founder & CEO interviews", "Product & brand story interviews", "Web3 & AI thought-leadership content", "Interview clips for social media & ads"]
  },
  {
    title: "Social Media Campaigns",
    icon: Share2,
    items: ["Brand & product launches", "Content strategy & calendars", "Community growth"]
  },
  {
    title: "Ads & Performance Marketing",
    icon: TrendingUp,
    items: ["Paid ad creatives", "Funnels & conversion strategy", "Web3-compliant ads"]
  },
  {
    title: "Product & Brand Design",
    icon: Brush,
    items: ["Brand identity systems", "UI/UX & landing pages"]
  },
  {
    title: "Marketing Videos",
    icon: Video,
    items: ["Investor & pitch videos", "Story-driven brand films"]
  },
  {
    title: "Web Development",
    icon: Code,
    items-align: ["Brand & product websites", "Conversion-optimized landing pages"]
  },
  {
    title: "Consultancy",
    icon: Brain,
    items: ["Brand & Web3 go-to-market strategy", "Growth audits & positioning"]
  },
  {
    title: "Courses & Training",
    icon: BookOpen,
    items: ["AI for marketing", "Web3 growth systems", "Content & video mastery"]
  }
]

export default function AboutPage() {
  const founderImage = PlaceHolderImages.find(p => p.id === "founder-portrait");
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="about" className="py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">Wolf of Web3</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">Web3, AI, Brand & Visual Marketing Agency</p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="about-details" className="pt-0 pb-16">
            <Card className="bg-card/50 border-border p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold font-headline mb-4 text-primary">🌍 About Wolf of Web3</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Wolf of Web3 is a Web3, AI, brand, and visual marketing agency helping startups, tech companies, and modern brands grow visibility, trust, and revenue.
                            </p>
                            <p>
                                We work beyond just tech — supporting consumer brands, digital products, Web3 projects, AI platforms, and founders with strategy, design, AI-powered content, professional camera-based video production, and high-impact marketing interviews that build authority and connection.
                            </p>
                            <p>
                                Our approach blends creative storytelling, AI innovation, real-world visuals, and performance marketing to turn attention into adoption.
                            </p>
                        </div>
                    </div>
                     {founderImage && (
                        <div className="relative w-48 h-48 md:w-full md:h-auto md:aspect-square rounded-full md:rounded-lg overflow-hidden border-4 border-primary/50 mx-auto">
                            <Image
                              src={founderImage.imageUrl}
                              alt="Stephen Awele, Founder of Wolf of Web3"
                              fill
                              className="object-cover"
                              data-ai-hint={founderImage.imageHint}
                           />
                        </div>
                    )}
                </div>
            </Card>
        </AnimatedSection>

        <AnimatedSection id="founder-bio" className="py-16 bg-secondary/30">
            <Card className="bg-card/50 border-border">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-3"><Users className="text-accent"/> Founder Bio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                     <p className="text-lg font-semibold text-foreground">Stephen Awele, professionally known as Wolf of Web3, is a Web3 & AI marketing strategist, creative director, and growth operator.</p>
                    <p>He has worked closely with Ryan Collin, widely regarded as the King of Web3, serving within his operational and assistant team. Through this experience, Stephen gained exposure to advanced Web3 marketing systems and growth strategies that have channeled millions of dollars into the Web3 ecosystem. Ryan Collin remains both his mentor and primary motivation.</p>
                    <p>Stephen has worked on Bitcoin-related projects, XRP ecosystem projects, and multiple brand-focused campaigns, delivering AI-driven videos, social campaigns, ads, product design, professional camera-shot content, and marketing interviews that position founders and brands as industry leaders.</p>
                </CardContent>
            </Card>
        </AnimatedSection>

        <AnimatedSection id="services" className="py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">🚀 Our Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-card/50 border-border flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <service.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {(service.items || service.items-align || []).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="positioning" className="py-16 bg-secondary/30">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <Card className="bg-card/50 border-border">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><Brain className="text-accent"/> Positioning Statement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">We don’t just promote brands — we turn founders into voices and products into movements using AI, video, and Web3-native strategy.</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="bg-card/50 border-border">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><Target className="text-primary"/> One-Line Elevator Pitch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">Wolf of Web3 is a Web3, AI, and brand marketing agency delivering AI videos, camera production, marketing interviews, campaigns, design, and growth strategy for modern brands and blockchain projects.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
