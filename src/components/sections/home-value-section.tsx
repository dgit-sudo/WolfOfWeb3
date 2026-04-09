import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const whatYouGetPoints = [
  "12 posts per month",
  "30 posts per month expansion",
  "Captions and copywriting",
  "Content scheduling included",
  "Social media management",
  "Two platform management",
  "Four platform expansion",
  "Monthly performance reporting",
  "One ad account management",
  "Up to three ad accounts",
  "Multi-channel ad strategy",
  "Full-funnel optimization",
  "Cinematic short-form videos",
  "Four edited videos monthly",
  "Premium cinematic production",
  "Long-form brand films",
  "Website and CRO optimization",
  "Landing page optimization",
  "A/B testing support",
  "Weekly strategy sessions",
  "Dedicated Slack access",
  "Dedicated growth operator",
  "Quarterly ecosystem audits",
  "Personalized workflows",
  "Personalized website creation",
  "Website maintenance support",
  "Domain by client",
  "Roadmap-based execution",
  "Conversion-first delivery",
  "Scalable growth systems",
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

        <Card className="bg-card/50 border-border">
          <CardHeader className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold">What You Get</p>
            <CardTitle className="text-3xl md:text-5xl font-headline leading-tight">
              Professional Growth Stack Built For Results
            </CardTitle>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Everything below is included across plan tiers, with increasing depth, speed, and execution support.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {whatYouGetPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground/90">{point}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild size="lg" variant="outline" className="text-base md:text-lg px-8 py-6 border-primary/50 text-primary hover:bg-primary/10">
            <Link href="/pricing">
              Compare Full Plan Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}