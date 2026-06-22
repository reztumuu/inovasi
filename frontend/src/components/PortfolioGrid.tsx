'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
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

interface PortfolioGridProps {
  initialItems: PortfolioItem[];
}

export default function PortfolioGrid({ initialItems }: PortfolioGridProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  // Translate category filter options dynamically
  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return t('portfolioPage.filterAll');
    return cat;
  };

  const categories = ['All', ...Array.from(new Set(initialItems.map(item => item.category)))];
  const filtered = activeCategory === 'All' ? initialItems : initialItems.filter(i => i.category === activeCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: '4px',
              fontFamily: "var(--font-display)",
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              background: activeCategory === cat ? 'var(--text-primary)' : 'var(--bg-surface)',
              color: activeCategory === cat ? 'var(--bg-base)' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--text-primary)' : 'var(--border-default)'}`,
            }}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {filtered.map(item => (
          <div
            key={item.id}
            className="solid-card"
            style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}
          >
            {/* Image */}
            <div className="img-cover-wrap" style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'var(--bg-elevated)', flexShrink: 0 }}>
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="img-cover" />
              ) : (
                <div style={{ height: '100%', width: '100%', background: 'var(--bg-elevated)' }} />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                <span className="badge badge-primary">{item.category}</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.client_name || t('featured.client')}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--text-primary)', marginTop: '4px', marginBottom: '8px',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
                  {item.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto', paddingTop: '8px' }}>
                {item.tech_stack.map((tech, i) => (
                  <span key={i} className="tech-pill">{tech}</span>
                ))}
              </div>

              {item.live_url && (
                <a
                  href={item.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-link"
                >
                  {t('featured.visitSite')}
                  <ExternalLink style={{ width: '13px', height: '13px' }} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: 'center', padding: '64px 24px',
            background: 'var(--bg-elevated)',
            border: '1px dashed var(--border-default)',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{t('portfolioPage.noProjects')}</p>
        </div>
      )}
    </div>
  );
}