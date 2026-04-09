import type { Metadata } from "next";

export const getSiteUrl = () => {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    "https://wolfofweb3.com";

  return raw.startsWith("http") ? raw : `https://${raw}`;
};

export const siteConfig = {
  name: "The Wolf of Web3",
  description:
    "Web development, video production, Web3 growth, and performance marketing services for modern brands.",
  keywords: [
    "web development",
    "website design",
    "video production",
    "marketing agency",
    "web3 marketing",
    "content strategy",
    "growth marketing",
    "conversion optimization",
    "brand strategy",
  ],
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata => {
  const siteUrl = getSiteUrl();
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
};

export const getOrganizationJsonLd = () => {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    sameAs: [
      "https://www.linkedin.com/in/stephen-awele?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      "https://github.com/dgit-sudo",
    ],
    description: siteConfig.description,
  };
};

export const getWebsiteJsonLd = () => {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-US",
  };
};