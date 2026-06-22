import PortfolioPageClient from '@/components/PortfolioPageClient';

interface PortfolioItem {
  id: number;
  title: string;
  client_name: string;
  category: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string | null;
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
        id: 1, title: 'E-Commerce Re-architecture', client_name: 'Apex Retailers Group',
        category: 'Web Development',
        description: 'Re-engineered a legacy monolith into a headless solution — 40% faster loads, 15% revenue boost.',
        image_url: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['Next.js', 'Laravel API', 'MySQL', 'Redis', 'Docker'],
        live_url: 'https://apex-retail.demo.com',
      },
      {
        id: 2, title: 'FitTrack Mobile Application', client_name: 'FitLife Global Inc.',
        category: 'Mobile App Development',
        description: 'Cross-platform fitness app with real-time health sync and custom workout scheduling.',
        image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['React Native', 'Laravel API', 'MySQL', 'Firebase'],
        live_url: 'https://fittrack-app.demo.com',
      },
      {
        id: 3, title: 'Secure AWS Cloud Migration', client_name: 'FinTech Ventures',
        category: 'Cloud & DevOps Solutions',
        description: 'Migrated legacy financial systems to containerized AWS infrastructure with full CI/CD pipeline.',
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'],
        live_url: null,
      },
    ];
  }
}

export const metadata = {
  title: 'Portfolio | InovasiTech Engineering Works',
  description: 'Explore our portfolio of premium web systems, mobile applications, and secure cloud solutions.',
};

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  return <PortfolioPageClient portfolios={portfolios} />;
}