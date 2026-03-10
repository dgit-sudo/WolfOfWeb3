import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/layout/animated-section";
import Link from "next/link";
import { getAdminContentById, getAdminContentBySection } from "@/lib/admin-db";
import { BookOpen, ChevronLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getAdminContentById(id);

  if (!post || post.section !== "blog") {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <AnimatedSection id="blog-post" className="pt-8">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <Card className="bg-card/50 border-border overflow-hidden">
              {post.thumbnailUrl ? (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/40" />
                </div>
              )}

              <CardHeader className="space-y-4">
                <div>
                  <CardTitle className="text-4xl font-headline mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-base">{post.description}</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                  <span>{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  {post.tags && post.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-accent text-accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {post.content || post.url}
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-bold font-headline">Other Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {getAdminContentBySection("blog")
                  .filter((p) => p.id !== post.id)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                      <Card className="bg-card/50 border-border hover:border-primary transition-colors duration-300 overflow-hidden group h-full">
                        {relatedPost.thumbnailUrl ? (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={relatedPost.thumbnailUrl}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-primary/40" />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <CardTitle className="text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">{relatedPost.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
