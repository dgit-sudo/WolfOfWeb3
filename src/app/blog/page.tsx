import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogSection } from "@/components/sections/blog-section";

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
