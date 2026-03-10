import { AnimatedSection } from "@/components/layout/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAdminContentBySection } from "@/lib/admin-db";
import { BookOpen } from "lucide-react";

export async function BlogSection() {
  const blogPosts = getAdminContentBySection("blog");

  return (
    <AnimatedSection id="blog">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent shadow-inner">
          <BookOpen className="inline-block h-4 w-4 mr-2" />
          Blog
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Latest Articles</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Insights on Web3, marketing, video production, and digital growth.
        </p>
      </div>

      {blogPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-card/50 border-border hover:border-primary transition-colors duration-300 overflow-hidden group flex flex-col">
              {post.thumbnailUrl ? (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary/40" />
                </div>
              )}
              <CardContent className="p-6 pb-4 flex-grow flex flex-col">
                <CardTitle className="font-headline text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="mt-2 text-foreground/80 flex-grow line-clamp-3">
                  {post.description}
                </CardDescription>
                {post.tags && post.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-accent text-accent text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <p className="mt-4 text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No blog posts yet.</p>
        </div>
      )}
    </AnimatedSection>
  );
}
