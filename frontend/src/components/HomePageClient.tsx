'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Globe, Smartphone, Palette, Cloud, Cpu,
  ArrowRight, Star, Code2, Layers, GitMerge,
  Shield, Database, Terminal, Rocket, Gem, Zap
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';

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

interface HomePageClientProps {
  services: ServiceItem[];
  portfolios: PortfolioItem[];
}

const iconMap: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  Globe, Smartphone, Palette, Cloud, Cpu,
  Code2, Shield, Database, Layers, Terminal
};

function AnimatedCounter({ value, startTrigger }: { value: string; startTrigger: boolean }) {
  const numericMatch = value.match(/^([\d.]+)/);
  const suffix = value.replace(/^[\d.]+/, '');
  const target = numericMatch ? parseFloat(numericMatch[1]) : 0;
  
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startTrigger) {
      setCount(0);
      return;
    }
    
    const duration = 1500; // 1.5 seconds animation
    const startTime = performance.now();
    let animationFrameId: number;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const currentVal = easeProgress * target;
      
      const isFloat = target % 1 !== 0;
      const formattedVal = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal).toString();
      
      setCount(parseFloat(formattedVal));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, startTrigger]);
  
  const isFloat = target % 1 !== 0;
  const displayVal = isFloat ? count.toFixed(1) : Math.floor(count);
  
  return (
    <span>
      {displayVal}
      {suffix}
    </span>
  );
}

export default function HomePageClient({ services, portfolios }: HomePageClientProps) {
  const { t } = useLanguage();
  const { settings } = useSettings();

  const [statsVisible, setStatsVisible] = useState(false);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const getLocalizedService = (service: ServiceItem) => {
    const tName = service.title.toLowerCase();
    if (tName.includes('web')) {
      return { title: t('services.web.title'), description: t('services.web.desc') };
    }
    if (tName.includes('mobile') || tName.includes('app')) {
      return { title: t('services.mobile.title'), description: t('services.mobile.desc') };
    }
    if (tName.includes('design') || tName.includes('ui') || tName.includes('ux')) {
      return { title: t('services.design.title'), description: t('services.design.desc') };
    }
    if (tName.includes('cloud') || tName.includes('devops')) {
      return { title: t('services.cloud.title'), description: t('services.cloud.desc') };
    }
    if (tName.includes('ai') || tName.includes('automation') || tName.includes('cpu')) {
      return { title: t('services.ai.title'), description: t('services.ai.desc') };
    }
    return { title: service.title, description: service.description };
  };

  const getLocalizedCategory = (cat: string) => {
    const tCat = cat.toLowerCase();
    if (tCat.includes('web')) return t('services.web.title');
    if (tCat.includes('mobile') || tCat.includes('app')) return t('services.mobile.title');
    if (tCat.includes('design') || tCat.includes('ui') || tCat.includes('ux')) return t('services.design.title');
    if (tCat.includes('cloud') || tCat.includes('devops')) return t('services.cloud.title');
    if (tCat.includes('ai') || tCat.includes('automation')) return t('services.ai.title');
    return cat;
  };

  return (
    <div style={{ background: 'var(--bg-base)', transition: 'background-color 0.3s ease' }}>

      {/* ============ HERO SECTION ============ */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 0 80px',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>

            {/* Left: Headline & Text (60% wide layout feeling) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>

              <h1
                className="animate-fade-up-delay-1"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                }}
              >
                {t('hero.titlePart1')}
                <span style={{ color: 'var(--accent-primary)' }}>{t('hero.titleSpan')}</span>
                {t('hero.titlePart2')}
              </h1>

              <p
                className="animate-fade-up-delay-2"
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                  marginBottom: '32px',
                }}
              >
                {t('hero.subtitle')}
              </p>

              <div
                className="animate-fade-up-delay-3"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
              >
                <Link href="#contact" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                  {t('hero.ctaStart')}
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </Link>
                <Link href="/portfolio" className="btn btn-ghost" style={{ padding: '12px 26px' }}>
                  {t('hero.ctaWork')}
                </Link>
              </div>
            </div>

            {/* Right: Clean editorial grid display of stats (Asymmetric) */}
            <div
              className="animate-fade-up-delay-4"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                borderLeft: '1px solid var(--border-default)',
                paddingLeft: '32px',
              }}
            >
              {[
                { value: '150+', label: t('hero.stats.projects') },
                { value: '99.8%', label: t('hero.stats.retention') },
                { value: '12+', label: t('hero.stats.countries') },
                { value: '45+', label: t('hero.stats.engineers') },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: '24px 16px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)',
                    borderRadius: '4px',
                  }}
                >
                  <div className="stat-number" style={{ marginBottom: '6px' }}>
                    <AnimatedCounter value={s.value} startTrigger={true} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section
        id="services"
        style={{ padding: '100px 0', borderBottom: '1px solid var(--border-default)' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Section Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '56px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)', maxWidth: '440px' }}>
                {t('services.title')}
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '480px' }}>
                {t('services.subtitle')}
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon_name] || Globe;
              const localized = getLocalizedService(service);
              return (
                <div
                  key={service.id}
                  className="solid-card"
                  style={{
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '4px',
                    background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <IconComponent style={{ width: '20px', height: '20px', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {localized.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {localized.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURED WORKS SECTION ============ */}
      <section
        style={{
          padding: '100px 0',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '48px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('featured.title')}
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="btn btn-ghost btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {t('featured.viewAll')}
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {portfolios.slice(0, 2).map(item => (
              <div
                key={item.id}
                className="solid-card"
                style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}
              >
                {/* Image */}
                <div className="img-cover-wrap" style={{ position: 'relative', height: '240px', overflow: 'hidden', background: 'var(--bg-elevated)' }}>
                  <img src={item.image_url} alt={item.title} className="img-cover" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    <span className="badge badge-primary">{getLocalizedCategory(item.category)}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.client_name || t('featured.client')}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', marginBottom: '8px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            ref={statsSectionRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--border-default)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {[
              { value: '150+', label: t('statsStrip.completed'), icon: Rocket, color: 'var(--accent-violet)' },
              { value: '99.8%', label: t('statsStrip.retention'), icon: Gem, color: 'var(--accent-cyan)' },
              { value: '12+', label: t('statsStrip.served'), icon: Globe, color: 'var(--accent-emerald)' },
              { value: '45+', label: t('statsStrip.senior'), icon: Zap, color: 'var(--accent-amber)' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '32px 16px',
                    background: 'var(--bg-surface)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
                    <Icon style={{ width: '16px', height: '16px', color: stat.color }} />
                  </div>
                  <div className="stat-number" style={{ marginBottom: '6px' }}>
                    <AnimatedCounter value={stat.value} startTrigger={statsVisible} />
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('testimonials.title')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[0, 1, 2].map((idx) => {
              const quote = t(`testimonials.list.${idx}.quote`);
              const author = t(`testimonials.list.${idx}.author`);
              const role = t(`testimonials.list.${idx}.role`);
              return (
                <div
                  key={idx}
                  className="solid-card"
                  style={{
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '260px'
                  }}
                >
                  <div>
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} style={{ width: '13px', height: '13px', color: '#fbbf24', fill: '#fbbf24' }} />
                      ))}
                    </div>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '24px' }}>
                      "{quote}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-default)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "var(--font-display)",
                      fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)',
                      flexShrink: 0,
                    }}>
                      {author.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{author}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section
        id="contact"
        style={{
          padding: '100px 0',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Left: Info */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                <span className="section-label"><span className="dot" />{t('contactSection.badge')}</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '20px',
                }}
              >
                {t('contactSection.title')}
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
                {t('contactSection.subtitle')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[0, 1, 2].map((i) => {
                  const title = t(`contactSection.whyUs.${i}.title`);
                  const desc = t(`contactSection.whyUs.${i}.desc`);
                  return (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '4px',
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)'
                      }}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          {title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Widget */}
      <a
        href={`https://wa.me/6281222054811?text=${encodeURIComponent(t('whatsapp.message').replace('{name}', settings.site_name || 'InovasiTech'))}`}
        target="_blank"
        rel="noopener noreferrer"
        title={t('whatsapp.tooltip')}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: '30px', height: '30px', display: 'block' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.458h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
