
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  
  return (
    <section id="hero" className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/80 to-background opacity-50" 
           style={{
             backgroundSize: '200% 200%',
             animation: 'background-pan 15s ease infinite',
           }}
      />
      <div className="absolute inset-0 bg-background/50" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <div 
            className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-inner"
          >
            Marketing · Web3 · Video · Web
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/70">
            Innovate. Create. Elevate.
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            A futurist specializing in marketing, Web3, video editing, and website creation. Driving growth and engagement through cutting-edge digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary))] transition-shadow">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/marketing">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ArrowDown className="h-6 w-6 text-foreground/50 animate-bounce" />
      </div>
    </section>
  );
}
