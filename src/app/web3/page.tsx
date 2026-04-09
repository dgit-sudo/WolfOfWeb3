import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Web3Section } from "@/components/sections/web3-section";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Web3 Marketing and Growth Services",
  description:
    "Discover Web3 projects and growth systems built for blockchain brands, AI products, and decentralized ecosystems.",
  path: "/web3",
  keywords: ["web3 marketing", "crypto growth", "blockchain brand strategy"],
});

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
