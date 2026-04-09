import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Plan = {
  tier: string;
  name: string;
  description: string;
  wasPrice: string;
  nowPrice: string;
  save: string;
  featured?: boolean;
  featureGroupLabel: string;
  features: Array<{ title: string; detail?: string }>;
};

const plans: Plan[] = [
  {
    tier: "Tier 01",
    name: "FOUNDATION",
    description: "Establish your presence. Build the base.",
    wasPrice: "Was $3,500/mo",
    nowPrice: "$1,750",
    save: "Save $1,750/mo",
    featureGroupLabel: "Included",
    features: [
      { title: "AI-Powered Content System", detail: "12 posts/mo — copy, captions & scheduling" },
      { title: "Social Media Management", detail: "2 platforms — posting, engagement & reporting" },
      { title: "Paid Ads Management", detail: "1 ad account — setup, copy & optimization" },
      { title: "Strategy Consulting", detail: "2 × 60-min sessions per month" },
      { title: "Monthly Performance Report" },
    ],
  },
  {
    tier: "Tier 02",
    name: "MOMENTUM",
    description: "Full-stack execution. Compounding returns.",
    wasPrice: "Was $7,500/mo",
    nowPrice: "$3,750",
    save: "Save $3,750/mo",
    featured: true,
    featureGroupLabel: "Everything in Foundation, plus",
    features: [
      { title: "Cinematic Short-Form Video", detail: "4 videos/mo — shot, edited & captioned" },
      { title: "AI Content System — Expanded", detail: "30 posts/mo across 4 platforms" },
      { title: "Paid Ads — Multi-Channel", detail: "Up to 3 ad accounts — full funnel" },
      { title: "Website / CRO Optimization", detail: "Landing pages, A/B testing & audits" },
      { title: "Personalized Website Creation & Maintenance", detail: "Custom website setup and monthly upkeep (domain by client)" },
      { title: "Weekly Strategy Sessions", detail: "4 × 60-min + dedicated Slack access" },
    ],
  },
  {
    tier: "Tier 03",
    name: "DOMINANCE",
    description: "Total ecosystem. Maximum output.",
    wasPrice: "Was $15,000/mo",
    nowPrice: "$7,500",
    save: "Save $7,500/mo",
    featureGroupLabel: "Everything in Momentum, plus",
    features: [
      { title: "Premium Cinematic Production", detail: "10+ videos/mo incl. long-form & brand films" },
      { title: "Full Website Design & Build", detail: "Custom conversion site + ongoing CRO" },
      { title: "Personalized Website Creation & Maintenance", detail: "Advanced custom build and maintenance support (domain by client)" },
      { title: "Unlimited Paid Ads Management", detail: "All channels — search, social & programmatic" },
      { title: "Dedicated Growth Operator", detail: "Embedded strategist + priority support" },
      { title: "Quarterly Ecosystem Audit", detail: "Deep-dive review + roadmap rebuild" },
    ],
  },
];

export function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="bg-secondary/30">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-4">
          <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">Retainer Plans</p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
            Choose Your Level of Dominance
          </h1>
          <Badge className="bg-primary/15 text-primary border border-primary/35 rounded-none px-4 py-2 text-xs tracking-[0.08em] uppercase">
            Limited Time Launch Pricing - 50% Off All Plans
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.featured
                ? "relative border-primary/50 bg-card/80 shadow-[0_0_30px_hsla(var(--primary),0.15)]"
                : "border-border bg-card/50"}
            >
              {plan.featured ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                  Most Popular
                </div>
              ) : null}

              <CardHeader className="space-y-2">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">{plan.tier}</p>
                <CardTitle className="text-3xl font-headline tracking-tight">{plan.name}</CardTitle>
                <CardDescription className="italic">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="border-y border-border py-5 space-y-2">
                  <p className="text-muted-foreground line-through">{plan.wasPrice}</p>
                  <div className="flex items-end gap-2">
                    <p className={plan.featured ? "text-primary text-5xl font-bold font-headline leading-none" : "text-5xl font-bold font-headline leading-none"}>
                      {plan.nowPrice}
                    </p>
                    <span className="text-muted-foreground pb-1">/ month</span>
                  </div>
                  <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                    {plan.save}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
                    {plan.featureGroupLabel}
                  </p>
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-3">
                        <span className={plan.featured
                          ? "mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center bg-primary text-primary-foreground"
                          : "mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center border border-primary/40 text-primary"}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {feature.title}
                          {feature.detail ? (
                            <span className="block text-xs text-muted-foreground italic mt-0.5">{feature.detail}</span>
                          ) : null}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className={plan.featured ? "w-full" : "w-full"} variant={plan.featured ? "default" : "outline"}>
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-sm text-muted-foreground border-t border-border pt-6">
          All plans require a 3-month minimum commitment. Ad spend billed separately. Launch pricing locks in for the duration of your initial term.
        </p>
      </div>
    </AnimatedSection>
  );
}