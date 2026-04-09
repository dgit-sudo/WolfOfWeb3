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
  monthlyPrice: number;
  annualDiscountPercent: number;
  featured?: boolean;
  featureGroupLabel: string;
  features: Array<{ title: string; detail?: string }>;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const annualPrice = (monthlyPrice: number, annualDiscountPercent: number) =>
  Math.round(monthlyPrice * 12 * (1 - annualDiscountPercent / 100));

const launchMonthlyPrice = (monthlyPrice: number) => Math.round(monthlyPrice / 2);
const launchEndsAt = new Date("2026-04-11T23:59:59Z");

const plans: Plan[] = [
  {
    tier: "Tier 01",
    name: "STARTER",
    description: "Establish your presence. Build the base.",
    monthlyPrice: 600,
    annualDiscountPercent: 15,
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
    monthlyPrice: 1400,
    annualDiscountPercent: 15,
    featured: true,
    featureGroupLabel: "Everything in Starter, plus",
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
    monthlyPrice: 2400,
    annualDiscountPercent: 15,
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
  const isLaunchActive = new Date() <= launchEndsAt;

  return (
    <AnimatedSection id="pricing" className="bg-secondary/30">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-4">
          <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">Retainer Plans</p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
            Choose Your Level of Dominance
          </h1>
          {isLaunchActive ? (
            <Badge className="bg-primary/15 text-primary border border-primary/35 rounded-none px-4 py-2 text-xs tracking-[0.08em] uppercase">
              Launch Offer - 50% Off Until April 11
            </Badge>
          ) : null}
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
                  {isLaunchActive ? (
                    <p className="text-muted-foreground line-through">
                      {formatCurrency(plan.monthlyPrice)} / month
                    </p>
                  ) : null}
                  <div className="flex items-end gap-2">
                    <p className={plan.featured ? "text-primary text-5xl font-bold font-headline leading-none" : "text-5xl font-bold font-headline leading-none"}>
                      {formatCurrency(isLaunchActive ? launchMonthlyPrice(plan.monthlyPrice) : plan.monthlyPrice)}
                    </p>
                    <span className="text-muted-foreground pb-1">/ month</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                      Annual: {formatCurrency(annualPrice(isLaunchActive ? launchMonthlyPrice(plan.monthlyPrice) : plan.monthlyPrice, plan.annualDiscountPercent))} / year
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {plan.annualDiscountPercent}% off annual billing
                    </span>
                  </div>
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
          All plans require a 3-month minimum commitment. Ad spend billed separately. Annual billing applies a 15% discount. Launch pricing is 50% off until April 11.
        </p>
      </div>
    </AnimatedSection>
  );
}