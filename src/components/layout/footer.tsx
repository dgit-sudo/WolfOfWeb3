
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} The Wolf of Web3. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
              </Button>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
              </Button>
            </Link>
            <Link href="#" aria-label="GitHub">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
