'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addAdminContentAction } from "@/app/neverbeforedicoverableadminpage/actions";
import type { AdminSection, AdminContentType } from "@/lib/admin-content";

const sections: AdminSection[] = ["marketing", "video", "web", "web3", "blog"];

type ContentTypesBySection = {
  [key in AdminSection]: AdminContentType[];
};

const contentTypesBySection: ContentTypesBySection = {
  marketing: ["video"],
  video: ["video"],
  web: ["website"],
  web3: ["website"],
  blog: ["blog"],
};

const sectionLabels: { [key in AdminSection]: string } = {
  marketing: "Marketing",
  video: "Video",
  web: "Web",
  web3: "Web3",
  blog: "Blog",
};

type ContentFieldsConfig = {
  [key in AdminSection]: {
    title: string;
    showTitle: boolean;
    showDescription: boolean;
    showUrl: boolean;
    showFile: boolean;
    showThumbnail: boolean;
    showTags: boolean;
    showContent: boolean;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    titlePlaceholder: string;
    urlPlaceholder: string;
    thumbnailPlaceholder: string;
    tagsPlaceholder: string;
  };
};

const fieldConfigs: ContentFieldsConfig = {
  marketing: {
    title: "Marketing Video",
    showTitle: false,
    showDescription: false,
    showUrl: true,
    showFile: true,
    showThumbnail: true,
    showTags: false,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "Strategic campaign video focused on brand growth and audience conversion.",
    titlePlaceholder: "Campaign Performance Reel",
    urlPlaceholder: "ScreenPal ID (e.g., cTlwhPnrhis) or https://video-url",
    thumbnailPlaceholder: "https://images.example.com/marketing-campaign-thumb.jpg",
    tagsPlaceholder: "",
  },
  video: {
    title: "Video Production",
    showTitle: false,
    showDescription: false,
    showUrl: true,
    showFile: true,
    showThumbnail: true,
    showTags: false,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "High-impact edit showcasing storytelling, pacing, and cinematic transitions.",
    titlePlaceholder: "Brand Storytelling Cut",
    urlPlaceholder: "ScreenPal ID (e.g., cTlwhPnrhiM) or https://video-url",
    thumbnailPlaceholder: "https://images.example.com/video-showcase-thumb.jpg",
    tagsPlaceholder: "",
  },
  web: {
    title: "Website Project",
    showTitle: true,
    showDescription: true,
    showUrl: true,
    showFile: false,
    showThumbnail: true,
    showTags: true,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "A performant website focused on UX, trust, and conversion for real users.",
    titlePlaceholder: "KalaSaarth",
    urlPlaceholder: "https://kalasaarthi.tech",
    thumbnailPlaceholder: "https://images.example.com/website-project-thumb.jpg",
    tagsPlaceholder: "E-commerce, UI/UX, SEO",
  },
  web3: {
    title: "Web3 Project",
    showTitle: true,
    showDescription: true,
    showUrl: true,
    showFile: false,
    showThumbnail: true,
    showTags: true,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "Decentralized product with secure smart contracts and community-led governance.",
    titlePlaceholder: "DeFiChain Staking Protocol",
    urlPlaceholder: "https://app.example-defi.xyz",
    thumbnailPlaceholder: "https://images.example.com/web3-project-thumb.jpg",
    tagsPlaceholder: "DeFi, Staking, Ethereum, Solidity",
  },
  blog: {
    title: "Blog Post",
    showTitle: true,
    showDescription: true,
    showUrl: false,
    showFile: false,
    showThumbnail: true,
    showTags: true,
    showContent: true,
    descriptionLabel: "Excerpt",
    descriptionPlaceholder: "Write a brief excerpt for this blog post...",
    titlePlaceholder: "How Web3 Branding Is Changing in 2026",
    urlPlaceholder: "",
    thumbnailPlaceholder: "https://images.example.com/blog-cover.jpg",
    tagsPlaceholder: "Web3, Marketing, Strategy",
  },
};

type FormFeedback = { tone: "error" | "success"; text: string } | null;

export function AdminContentForm({ initialFeedback }: { initialFeedback: FormFeedback }) {
  const [section, setSection] = useState<AdminSection>("marketing");
  const [feedback, setFeedback] = useState<FormFeedback>(initialFeedback);

  const config = fieldConfigs[section];
  const contentTypes = contentTypesBySection[section];
  const type = contentTypes[0]; // Auto-select the only available type

  const handleSubmit = async (formData: FormData) => {
    // Set the type dynamically based on section
    formData.set("type", type);
    formData.set("section", section);
    
    try {
      await addAdminContentAction(formData);
      setFeedback({ tone: "success", text: "Content added successfully!" });
      // Reset form fields
      const form = (document.activeElement as HTMLButtonElement)?.form;
      if (form) form.reset();
      setSection("marketing");
    } catch (error) {
      setFeedback({ 
        tone: "error", 
        text: "Failed to add content. Please check your inputs." 
      });
    }
  };

  return (
    <Card className="bg-card/60 border-border">
      <CardHeader>
        <CardTitle>Add New Content</CardTitle>
        <CardDescription>{config.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="section" className="text-sm text-muted-foreground">Section</label>
            <select
              id="section"
              name="section"
              value={section}
              onChange={(e) => {
                setSection(e.target.value as AdminSection);
                setFeedback(null);
              }}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {sections.map((item) => (
                <option key={item} value={item}>{sectionLabels[item]}</option>
              ))}
            </select>
          </div>

          {contentTypes.length > 1 && (
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm text-muted-foreground">Content Type</label>
              <select
                id="type"
                name="type"
                defaultValue={contentTypes[0]}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {contentTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}

          <input type="hidden" name="type" value={type} />

          {config.showTitle ? (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm text-muted-foreground">Title *</label>
              <Input id="title" name="title" placeholder={config.titlePlaceholder} required />
            </div>
          ) : (
            <input type="hidden" name="title" value="" />
          )}

          {config.showDescription ? (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm text-muted-foreground">{config.descriptionLabel} *</label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder={config.descriptionPlaceholder}
                rows={4} 
                required 
              />
            </div>
          ) : (
            <input type="hidden" name="description" value="" />
          )}

          {config.showContent && (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="content" className="text-sm text-muted-foreground">Full Article Content *</label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="Write the full article content here..." 
                rows={8}
              />
            </div>
          )}

          {config.showUrl && (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="url" className="text-sm text-muted-foreground">
                {section === "marketing" || section === "video" ? "Video URL or ScreenPal ID" : "External Link/URL"}
              </label>
              <Input 
                id="url" 
                name="url" 
                placeholder={config.urlPlaceholder}
              />
            </div>
          )}

          {config.showFile && (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="file" className="text-sm text-muted-foreground">Upload Video File (optional)</label>
              <Input id="file" name="file" type="file" accept="video/*" />
            </div>
          )}

          {config.showThumbnail && (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="thumbnailUrl" className="text-sm text-muted-foreground">
                Thumbnail URL (optional)
              </label>
              <Input id="thumbnailUrl" name="thumbnailUrl" placeholder={config.thumbnailPlaceholder} />
            </div>
          )}

          {config.showTags && (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="tags" className="text-sm text-muted-foreground">Tags (comma-separated, optional)</label>
              <Input id="tags" name="tags" placeholder={config.tagsPlaceholder} />
            </div>
          )}

          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit">Add Content</Button>
            {feedback ? (
              <p className={feedback.tone === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
                {feedback.text}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
