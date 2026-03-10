import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebsiteSection } from "@/components/sections/website-section";

export const dynamic = "force-dynamic";

export default function WebPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <WebsiteSection />
      </main>
      <Footer />
    </div>
  );
}
