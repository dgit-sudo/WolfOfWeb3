import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogSection } from "@/components/sections/blog-section";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog: Web Development, Video, and Web3 Insights",
  description:
    "Read articles on web development, video marketing, Web3 growth, and practical digital strategy.",
  path: "/blog",
  keywords: ["web development blog", "video marketing blog", "web3 insights"],
});

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
