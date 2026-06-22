'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

interface BlogPostPageClientProps {
  post: BlogPost;
}

export default function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  const { t, language } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const paragraphs = post.content.split('\n\n');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', transition: 'background-color 0.3s ease', overflowX: 'hidden' }}>
      {/* Hero Image Banner */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(260px, 40vh, 400px)', overflow: 'hidden' }}>
        <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
        }} />
      </div>

      {/* Content Container */}
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 100px', position: 'relative' }}>
        {/* Meta Header Card */}
        <div
          className="solid-card"
          style={{
            padding: '28px',
            marginTop: '-48px',
            position: 'relative',
            zIndex: 2,
            marginBottom: '40px',
            background: 'var(--bg-surface)',
          }}
        >
          {/* Back Button */}
          <Link
            href="/blog"
            className="back-link"
          >
            <ArrowLeft style={{ width: '14px', height: '14px' }} />
            {t('blogSingle.backBtn')}
          </Link>

          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            {[
              { Icon: Calendar, label: formatDate(post.created_at) },
              { Icon: User, label: post.author_name },
              { Icon: Clock, label: `5 ${t('blogPage.readTime')}` },
            ].map(({ Icon, label }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <Icon style={{ width: '14px', height: '14px', color: 'var(--text-primary)' }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <p style={{
          fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7,
          borderLeft: '2px solid var(--accent-primary)',
          paddingLeft: '16px',
          marginBottom: '32px',
          fontStyle: 'italic',
        }}>
          {post.summary}
        </p>

        {/* Body Content */}
        <div className="prose-custom">
          {paragraphs.map((para, i) => {
            if (para.startsWith('### ')) {
              return <h3 key={i}>{para.replace('### ', '')}</h3>;
            }
            if (para.startsWith('1. ') || para.startsWith('- ')) {
              return (
                <ul key={i}>
                  {para.split('\n').map((li, li_i) => (
                    <li key={li_i}>{li.replace(/^[-\d\.\s]+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
                  ))}
                </ul>
              );
            }
            if (para.startsWith('```')) {
              const lines = para.split('\n');
              return (
                <pre key={i}>
                  <code>{lines.slice(1, -1).join('\n')}</code>
                </pre>
              );
            }
            
            // Bold text styling mapping
            const withBold = para.split(/(\*\*.*?\*\*)/).map((part, pi) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pi} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
              }
              return part;
            });
            return <p key={i}>{withBold}</p>;
          })}
        </div>

        {/* Dynamic bottom CTA banner */}
        <div
          className="solid-card"
          style={{
            padding: '32px',
            marginTop: '56px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            background: 'var(--bg-surface)',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {t('blogSingle.readyTitle')}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t('blogSingle.readySub')}
            </p>
          </div>
          <Link href="/#contact" className="btn btn-primary btn-sm">
            {t('blogSingle.startProject')}
          </Link>
        </div>
      </article>
    </div>
  );
}
