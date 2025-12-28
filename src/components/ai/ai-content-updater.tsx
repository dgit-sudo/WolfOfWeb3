
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { generateContent } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';

type AIContentUpdaterProps = {
  sectionTitle: string;
  content: string;
};

export function AIContentUpdater({ sectionTitle, content }: AIContentUpdaterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [generated, setGenerated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!description) {
        toast({
            title: 'Description needed',
            description: 'Please describe the content you want to generate.',
            variant: 'destructive',
        });
        return;
    }
    setIsLoading(true);
    setGenerated('');
    const fullPrompt = `This is for the "${sectionTitle}" section. The existing content format is:\n\n${content}\n\nMy request is: "${description}"`;

    try {
        const result = await generateContent({ sectionDescription: fullPrompt });
        if (result.suggestedContent) {
            setGenerated(result.suggestedContent);
        } else if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            });
        }
    } catch (error) {
        toast({
            title: 'Error',
            description: 'An unexpected error occurred.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20">
          <Wand2 className="mr-2 h-4 w-4" />
          Edit with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Bot className="text-primary" />
            AI Content Generator for "{sectionTitle}"
          </DialogTitle>
          <DialogDescription>
            Describe the new project, case study, or update you'd like to add. The AI will generate new content following the existing format.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
            <Textarea
                id="description"
                placeholder={`e.g., "Add a new web3 project about a decentralized identity solution called 'Veritas'."`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-secondary"
            />
            {generated && (
                <div className="space-y-2">
                    <h4 className="font-semibold text-primary flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Suggested Content
                    </h4>
                    <Card className="bg-secondary border-primary/20">
                        <CardContent className="p-4">
                            <pre className="whitespace-pre-wrap text-sm font-sans text-foreground/90">{generated}</pre>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                'Generate'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
