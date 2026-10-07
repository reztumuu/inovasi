import React from 'react';
import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: "Codevora | Jasa Pembuatan Website & Software Engineering Studio",
  description: "Jasa pembuatan website profesional, toko online, company profile perusahaan, dan custom web app di Indonesia. Cepat, responsif, aman, dan mudah dicari di Google dengan Next.js & Laravel.",
  keywords: [
    "jasa pembuatan website",
    "jasa buat website",
    "jasa bikin website",
    "pembuatan website",
    "pembuatan website profesional",
    "jasa pembuatan website murah",
    "jasa pembuatan website company profile",
    "jasa website toko online",
    "jasa web development",
    "web development indonesia",
    "software house indonesia",
    "software house bandung",
    "web developer indonesia",
    "custom web application",
    "next.js developer indonesia",
    "laravel developer indonesia",
    "jasa seo website",
    "website creation",
    "custom website development",
    "web development services",
    "codevora"
  ],
  alternates: {
    canonical: "https://codevora.id",
    languages: {
      "id-ID": "https://codevora.id",
      "en-US": "https://codevora.id",
    },
  },
  openGraph: {
    title: "Codevora | Jasa Pembuatan Website & Software Engineering Studio",
    description: "Layanan jasa pembuatan website profesional, aplikasi web modern, dan sistem enterprise berkecepatan tinggi dengan Next.js & Laravel.",
    url: "https://codevora.id",
    siteName: "Codevora",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "https://codevora.id/uploads/dPjXP5TGe2dbYLEnTZ70.png",
        width: 1200,
        height: 630,
        alt: "Codevora - Jasa Pembuatan Website & Software Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codevora | Jasa Pembuatan Website & Software Engineering Studio",
    description: "Jasa pembuatan website profesional dan software engineering terpercaya di Indonesia.",
    images: ["https://codevora.id/uploads/dPjXP5TGe2dbYLEnTZ70.png"],
  },
};

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  client_name: string;
  category: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string;
}

async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch('https://codevora.id/api/services', { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('API server down');
    const json = await res.json();
    return json.data;
  } catch {
    // Elegant fallbacks matching the translations mappings
    return [
      { id: 1, title: 'Web Development', description: 'Custom portals, e-commerce & SaaS platforms built with Next.js and Laravel for maximum performance.', icon_name: 'Globe' },
      { id: 2, title: 'Mobile Apps', description: 'High-performance cross-platform mobile apps for iOS & Android using React Native and Flutter.', icon_name: 'Smartphone' },
      { id: 3, title: 'UI/UX Design', description: 'Human-centered design systems, prototypes, and style guides that delight and retain users.', icon_name: 'Palette' },
      { id: 4, title: 'Cloud & DevOps', description: 'Scalable AWS/GCP architectures, automated CI/CD pipelines, and container infrastructure.', icon_name: 'Cloud' },
      { id: 5, title: 'AI & Automation', description: 'Custom AI workflows, intelligent chatbots, NLP interfaces, and automated scripts.', icon_name: 'Cpu' },
    ];
  }
}

async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch('https://codevora.id/api/portfolios', { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('API server down');
    const json = await res.json();
    return json.data;
  } catch {
    return [
      {
        id: 1,
        title: 'E-Commerce Re-architecture',
        client_name: 'Apex Retailers Group',
        category: 'Web Development',
        description: 'Re-engineered a legacy monolith into a headless commerce solution — 40% faster load times, 15% revenue increase.',
        image_url: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['Next.js', 'Laravel API', 'MySQL', 'Redis', 'Docker'],
      },
      {
        id: 2,
        title: 'FitTrack Mobile App',
        client_name: 'FitLife Global Inc.',
        category: 'Mobile App',
        description: 'Cross-platform fitness app with real-time health sync, push notifications, and workout customization.',
        image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['React Native', 'Laravel API', 'Firebase'],
      },
    ];
  }
}

export default async function Home() {
  const services = await getServices();
  const portfolios = await getPortfolios();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Featured Engineering Works & Projects | Codevora",
    "description": "Selected client projects and case studies developed by Codevora Software Engineering Studio.",
    "url": "https://codevora.id",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": portfolios.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": item.title,
          "headline": item.title,
          "description": item.description,
          "image": item.image_url,
          "creator": {
            "@type": "Organization",
            "name": "Codevora",
            "url": "https://codevora.id",
          },
          ...(item.live_url ? { "url": item.live_url } : {}),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient services={services} portfolios={portfolios} />
    </>
  );
}