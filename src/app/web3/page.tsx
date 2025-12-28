import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Web3Section } from "@/components/sections/web3-section";

export default function Web3Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Web3Section />
      </main>
      <Footer />
    </div>
  );
}
