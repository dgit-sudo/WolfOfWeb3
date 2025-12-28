
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { AnimatedSection } from "@/components/layout/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Loader2, Send } from "lucide-react";
import { submitContactForm } from '@/app/actions';
import type { ContactFormState } from '@/app/schemas';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_20px_hsl(var(--accent))] transition-shadow">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export function ContactSection() {
  const initialState: ContactFormState = { success: false, message: '' };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <AnimatedSection id="contact" className="bg-secondary/30">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
         <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-inner">
            <Mail className="inline-block h-4 w-4 mr-2" />
            Contact
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Let's Create Together</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Have a project in mind or want to connect? Drop me a line.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="bg-background/50 h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="bg-background/50 h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                id="message"
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                className="bg-background/50 text-base"
              />
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
