import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/sections/contact-section";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
