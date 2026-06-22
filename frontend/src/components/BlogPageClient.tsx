'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { t, language } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            {t('blogPage.title')}
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
            {t('blogPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ padding: '48px 0 100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {posts.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '64px 24px',
              background: 'var(--bg-elevated)',
              border: '1px dashed var(--border-default)',
              borderRadius: '4px',
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>{t('blogPage.noArticles')}</p>
            </div>
          ) : (
            <>
              {/* Featured Post (first item in asymmetric style) */}
              {posts[0] && (
                <Link
                  href={`/blog/${posts[0].slug}`}
                  style={{ textDecoration: 'none', display: 'block', marginBottom: '32px' }}
                >
                  <article
                    className="solid-card"
                    style={{
                      overflow: 'hidden',
                      padding: 0,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    }}
                  >
                    <div className="img-cover-wrap" style={{ position: 'relative', minHeight: '280px', overflow: 'hidden', background: 'var(--bg-elevated)' }}>
                      <img src={posts[0].image_url} alt={posts[0].title} className="img-cover" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                        <span className="badge badge-primary">
                          ★ {t('blogPage.featured')}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {[
                          { icon: Calendar, text: formatDate(posts[0].created_at) },
                          { icon: User, text: posts[0].author_name },
                          { icon: Clock, text: `5 ${t('blogPage.readTime')}` },
                        ].map((m, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <m.icon style={{ width: '13px', height: '13px' }} />
                            {m.text}
                          </div>
                        ))}
                      </div>
                      <h2 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                        {posts[0].title}
                      </h2>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {posts[0].summary}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
                        {t('blogPage.readArticle')}
                        <ArrowRight style={{ width: '15px', height: '15px' }} />
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Remaining Posts Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {posts.slice(1).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <article
                      className="solid-card"
                      style={{
                        overflow: 'hidden',
                        padding: 0,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div className="img-cover-wrap" style={{ height: '200px', overflow: 'hidden', background: 'var(--bg-elevated)', flexShrink: 0 }}>
                        <img src={post.image_url} alt={post.title} className="img-cover" />
                      </div>
                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {[
                            { icon: Calendar, text: formatDate(post.created_at) },
                            { icon: Clock, text: `5 ${t('blogPage.readTime')}` },
                          ].map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                              <m.icon style={{ width: '12px', height: '12px' }} />
                              {m.text}
                            </div>
                          ))}
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '4px' }}>
                          {post.title}
                        </h3>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
                          {post.summary}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-accent)', fontSize: '0.8rem', fontWeight: 600, marginTop: '8px' }}>
                          {t('blogPage.readMore')}
                          <ArrowRight style={{ width: '13px', height: '13px' }} />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
