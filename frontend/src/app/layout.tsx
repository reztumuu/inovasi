import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const dynamic = 'force-dynamic';

async function getSettings() {
  try {
    const res = await fetch('https://codevora.id/api/settings', {
      next: { revalidate: 10 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'success') {
        return json.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch settings on server:", err);
  }
  return null;
}

function parseLinkRel(html: string) {
  if (!html) return null;
  const linkReg = /<link\s+([^>]+?)\s*\/?>/gi;
  const attrReg = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  const links: any[] = [];
  
  let match;
  while ((match = linkReg.exec(html)) !== null) {
    const attrString = match[1];
    const attrs: any = {};
    let attrMatch;
    attrReg.lastIndex = 0;
    while ((attrMatch = attrReg.exec(attrString)) !== null) {
      const name = attrMatch[1];
      const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4];
      attrs[name] = value;
    }
    links.push(attrs);
  }
  
  return links.map((attrs, idx) => {
    const className = attrs.class ? `${attrs.class} injected-setting-rel` : 'injected-setting-rel';
    return <link key={idx} {...attrs} className={className} />;
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const title = settings?.site_name 
    ? { default: `${settings.site_name} | Premium Software Engineering Studio`, template: `%s | ${settings.site_name}` }
    : { default: "Codevora | Premium Software Engineering Studio", template: "%s | Codevora" };

  return {
    title,
    description: settings?.meta_description || "We design and engineer bespoke, high-performance web systems, mobile applications, and cloud infrastructure. Elevate your business with world-class software engineering.",
    keywords: settings?.meta_keywords 
      ? settings.meta_keywords.split(',').map((k: string) => k.trim())
      : ["software house", "web development", "mobile development", "nextjs", "laravel", "devops", "cloud", "indonesia", "software company"],
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
    icons: {
      icon: settings?.site_favicon || settings?.site_logo || "/favicon.ico",
      shortcut: settings?.site_favicon || settings?.site_logo || "/favicon.ico",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: settings?.site_name || "Codevora",
      title: settings?.site_name 
        ? `${settings.site_name} | Premium Software Engineering Studio` 
        : "Codevora | Premium Software Engineering Studio",
      description: settings?.meta_description || "Bespoke, high-performance software systems for enterprises and startups.",
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
      title: settings?.site_name 
        ? `${settings.site_name} | Premium Software Engineering Studio` 
        : "Codevora | Premium Software Engineering Studio",
      description: settings?.meta_description || "Bespoke, high-performance software systems for enterprises and startups.",
      images: ["/og-image.png"],
      creator: "@codevora",
    },
    robots: settings?.robots || "index, follow",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <head>
        {settings?.link_rel && parseLinkRel(settings.link_rel)}
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers initialSettings={settings}>
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

