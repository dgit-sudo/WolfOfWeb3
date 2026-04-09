import Link from "next/link";
import { ArrowRight, Film, Globe, Megaphone, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const serviceHighlights = [
  {
    title: "Marketing Systems",
    description:
      "Campaign-ready creative, performance strategy, and distribution designed to drive measurable growth.",
    href: "/marketing",
    icon: Megaphone,
  },
  {
    title: "Video Production",
    description:
      "Short-form and long-form edits built for retention, conversion, and stronger brand storytelling.",
    href: "/video",
    icon: Film,
  },
  {
    title: "Web Experiences",
    description:
      "Fast, conversion-focused websites and landing pages engineered for real business outcomes.",
    href: "/web",
    icon: Globe,
  },
];

export function HomeValueSection() {
  return (
    <AnimatedSection id="home-value" className="pt-10 md:pt-14">
      <div className="space-y-8">
        <Card className="border-primary/50 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
          <CardContent className="py-10 md:py-14 px-6 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold">Ready to Start?</p>
              <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-primary">
                SEE PRICING
              </h2>
              <p className="text-muted-foreground">Compare Foundation, Momentum, and Dominance plans.</p>
            </div>
            <Button asChild size="lg" className="text-base md:text-lg px-8 py-6">
              <Link href="/pricing">
                Go to Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-4 w-4" />
            What You Get
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Full-Stack Digital Growth, Not Fragmented Freelance Work
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            From content and video to websites and Web3 positioning, every output is aligned to one goal: stronger visibility and higher conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceHighlights.map((item) => (
            <Card key={item.title} className="bg-card/50 border-border hover:border-primary/60 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-headline">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                <Button asChild variant="ghost" className="px-0 text-primary hover:text-primary hover:bg-transparent">
                  <Link href={item.href}>
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}