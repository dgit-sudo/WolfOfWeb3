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
    showUrl: boolean;
    showFile: boolean;
    showThumbnail: boolean;
    showTags: boolean;
    showContent: boolean;
    descriptionLabel: string;
    descriptionPlaceholder: string;
  };
};

const fieldConfigs: ContentFieldsConfig = {
  marketing: {
    title: "Marketing Video",
    showUrl: true,
    showFile: true,
    showThumbnail: true,
    showTags: false,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "Describe this marketing video...",
  },
  video: {
    title: "Video Production",
    showUrl: true,
    showFile: true,
    showThumbnail: true,
    showTags: false,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "Describe this video...",
  },
  web: {
    title: "Website Project",
    showUrl: true,
    showFile: false,
    showThumbnail: true,
    showTags: true,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "Describe this website project...",
  },
  web3: {
    title: "Web3 Project",
    showUrl: true,
    showFile: false,
    showThumbnail: true,
    showTags: true,
    showContent: false,
    descriptionLabel: "Description",
    descriptionPlaceholder: "Describe this Web3 project...",
  },
  blog: {
    title: "Blog Post",
    showUrl: false,
    showFile: false,
    showThumbnail: true,
    showTags: true,
    showContent: true,
    descriptionLabel: "Excerpt",
    descriptionPlaceholder: "Write a brief excerpt for this blog post...",
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

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="title" className="text-sm text-muted-foreground">Title *</label>
            <Input id="title" name="title" required />
          </div>

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
                placeholder={section === "marketing" || section === "video" ? "https://... or ScreenPal ID" : "https://..."}
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
              <Input id="thumbnailUrl" name="thumbnailUrl" placeholder="https://..." />
            </div>
          )}

          {config.showTags && (
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="tags" className="text-sm text-muted-foreground">Tags (comma-separated, optional)</label>
              <Input id="tags" name="tags" placeholder="e.g., web3, defi, nft" />
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
