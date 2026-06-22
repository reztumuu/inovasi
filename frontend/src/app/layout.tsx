import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Codevora | Premium Software Engineering Studio",
    template: "%s | Codevora",
  },
  description: "We design and engineer bespoke, high-performance web systems, mobile applications, and cloud infrastructure. Elevate your business with world-class software engineering.",
  keywords: ["software house", "web development", "mobile development", "nextjs", "laravel", "devops", "cloud", "indonesia", "software company"],
  authors: [{ name: "Codevora" }],
  creator: "Codevora",
  publisher: "Codevora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://codevora.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Codevora",
    title: "Codevora | Premium Software Engineering Studio",
    description: "Bespoke, high-performance software systems for enterprises and startups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codevora - Software Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codevora | Premium Software Engineering Studio",
    description: "Bespoke, high-performance software systems for enterprises and startups.",
    images: ["/og-image.png"],
    creator: "@codevora",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          <Header />
          <main style={{ flex: 1, paddingTop: '72px', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
