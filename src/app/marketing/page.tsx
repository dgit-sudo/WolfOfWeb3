import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MarketingSection } from "@/components/sections/marketing-section";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <MarketingSection />
      </main>
      <Footer />
    </div>
  );
}
