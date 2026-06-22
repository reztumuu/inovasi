import React from 'react';
import HomePageClient from '@/components/HomePageClient';

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
}

async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/services', { next: { revalidate: 10 } });
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
    const res = await fetch('http://127.0.0.1:8000/api/portfolios', { next: { revalidate: 10 } });
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

  return <HomePageClient services={services} portfolios={portfolios} />;
}