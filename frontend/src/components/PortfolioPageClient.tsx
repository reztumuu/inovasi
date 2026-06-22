'use client';

import React from 'react';
import PortfolioGrid from '@/components/PortfolioGrid';
import { useLanguage } from '@/context/LanguageContext';

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

interface PortfolioPageClientProps {
  portfolios: PortfolioItem[];
}

export default function PortfolioPageClient({ portfolios }: PortfolioPageClientProps) {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', transition: 'background-color 0.3s ease' }}>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '120px 0 60px',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              lineHeight: 1.15,
              maxWidth: '800px',
            }}
          >
            {t('portfolioPage.title')}
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
            {t('portfolioPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '48px 0 100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <PortfolioGrid initialItems={portfolios} />
        </div>
      </section>
    </div>
  );
}
