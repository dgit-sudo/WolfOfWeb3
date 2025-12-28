
'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4000); // Start fading out after 4 seconds

    const layoutTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Remove splash screen from layout after 5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(layoutTimer);
    };
  }, []);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000",
          isFadingOut ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
            <Logo className="absolute inset-0 w-full h-full text-primary opacity-0 animate-[fade-in_1s_ease-out_forwards]" style={{ animationDelay: '0.5s' }} />
            <Logo className="absolute inset-0 w-full h-full text-accent opacity-0 animate-[fade-in_1s_ease-out_forwards]" style={{ animationDelay: '0.7s', filter: 'blur(8px)' }} />
            <Logo className="absolute inset-0 w-full h-full text-primary/50 opacity-0 animate-[fade-in_1s_ease-out_forwards]" style={{ animationDelay: '0.9s', filter: 'blur(16px)' }} />
            </div>
            <h1 
                className="text-2xl font-headline font-bold text-primary opacity-0 animate-[fade-in_1s_ease-out_forwards]"
                style={{ animationDelay: '1.5s' }}
            >
                The Wolf of Web3
            </h1>
        </div>
      </div>
      <div className={cn(isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500')}>
        {children}
      </div>
    </>
  );
}
