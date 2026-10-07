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

function extractYoutubeId(text: string): string | null {
  const commentMatch = text.match(/<!--\s*(?:FLAMES_)?YOUTUBE(?:_VIDEO)?_ID:([a-zA-Z0-9_-]+)\s*-->/i);
  if (commentMatch) return commentMatch[1];

  const urlMatch = text.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (urlMatch) return urlMatch[1];

  return null;
}

function VideoEmbed({ videoId }: { videoId: string }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        margin: '28px 0',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border-default)',
        background: '#000',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </div>
  );
}

function renderInlineText(text: string): React.ReactNode[] {
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|(https?:\/\/[^\s<]+))/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const linkText = match[2];
      const linkUrl = match[3];
      const isInternal = linkUrl.startsWith('/') || linkUrl.startsWith('https://codevora.id');
      elements.push(
        <a
          key={match.index}
          href={linkUrl}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          style={{
            color: 'var(--accent-cyan, #0ea5e9)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: 600,
          }}
          className="hover-text-primary"
        >
          {linkText}
        </a>
      );
    } else if (match[4]) {
      elements.push(
        <strong key={match.index} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      elements.push(
        <em key={match.index} style={{ fontStyle: 'italic' }}>
          {match[5]}
        </em>
      );
    } else if (match[6]) {
      elements.push(
        <code
          key={match.index}
          style={{
            background: 'var(--bg-elevated)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.85em',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {match[6]}
        </code>
      );
    } else if (match[7]) {
      const url = match[7];
      elements.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent-cyan, #0ea5e9)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            wordBreak: 'break-all',
          }}
        >
          {url}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
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

  const blocks = post.content.split(/\n{2,}/);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', transition: 'background-color 0.3s ease', overflowX: 'hidden' }}>
      {/* Hero Image Banner */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(260px, 40vh, 400px)', overflow: 'hidden' }}>
        <img
          src={post.image_url}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="eager"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
        }} />
      </div>

      {/* Content Container */}
      <article
        itemScope
        itemType="https://schema.org/BlogPosting"
        style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 100px', position: 'relative' }}
      >
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
            itemProp="headline"
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <Calendar style={{ width: '14px', height: '14px', color: 'var(--text-primary)' }} />
              <time itemProp="datePublished" dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            </div>
            {post.author_name && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <User style={{ width: '14px', height: '14px', color: 'var(--text-primary)' }} />
                <span itemProp="author">{post.author_name}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <Clock style={{ width: '14px', height: '14px', color: 'var(--text-primary)' }} />
              <span>5 {t('blogPage.readTime')}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p
          itemProp="description"
          style={{
            fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7,
            borderLeft: '2px solid var(--accent-primary)',
            paddingLeft: '16px',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
        >
          {post.summary}
        </p>

        {/* Body Content */}
        <div itemProp="articleBody" className="prose-custom">
          {blocks.map((rawBlock, i) => {
            const videoId = extractYoutubeId(rawBlock);
            let block = rawBlock.replace(/<!--\s*(?:FLAMES_)?YOUTUBE(?:_VIDEO)?_ID:([a-zA-Z0-9_-]+)\s*-->/gi, '').trim();

            // Defensive guard: skip blocks that are leftover ad/tracker script
            // text (e.g. "(adsbygoogle = window.adsbygoogle || []).push({});")
            // so it can never render as visible article text.
            if (/^\s*(?:<\/?(?:script|ins|iframe|noscript)\b[^>]*>|\.?adsbygoogle|window\.adsbygoogle|\(\s*adsbygoogle)/i.test(block)) {
              return null;
            }
            if (/\(\s*adsbygoogle\s*=\s*window\s*\.\s*adsbygoogle\s*(?:\|\||or)\s*\[\s*\]\s*\)\s*\.\s*push\s*\(/i.test(block)) {
              return null;
            }

            if (block.match(/^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/\S+$/i)) {
              block = '';
            }

            const videoElement = videoId ? <VideoEmbed key={`vid-${i}`} videoId={videoId} /> : null;
            if (!block) {
              return videoElement;
            }

            let contentElement: React.ReactNode = null;

            if (block.startsWith('#### ')) {
              contentElement = (
                <h4 key={`h4-${i}`} style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '22px', marginBottom: '8px' }}>
                  {renderInlineText(block.slice(5).trim())}
                </h4>
              );
            } else if (block.startsWith('### ')) {
              contentElement = (
                <h3 key={`h3-${i}`} style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '28px', marginBottom: '12px', lineHeight: 1.35 }}>
                  {renderInlineText(block.slice(4).trim())}
                </h3>
              );
            } else if (block.startsWith('## ')) {
              contentElement = (
                <h2 key={`h2-${i}`} style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '36px', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                  {renderInlineText(block.slice(3).trim())}
                </h2>
              );
            } else if (block.startsWith('# ')) {
              contentElement = (
                <h2 key={`h1-${i}`} style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '36px', marginBottom: '16px', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                  {renderInlineText(block.slice(2).trim())}
                </h2>
              );
            } else if (block.startsWith('---') || block.startsWith('***')) {
              const afterHr = block.replace(/^[-*]{3,}\s*/, '').trim();
              contentElement = (
                <React.Fragment key={`hr-${i}`}>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: '36px 0' }} />
                  {afterHr && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                      {renderInlineText(afterHr)}
                    </p>
                  )}
                </React.Fragment>
              );
            } else if (block.startsWith('```')) {
              const lines = block.split('\n');
              contentElement = (
                <pre key={`pre-${i}`} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '6px', overflowX: 'auto', border: '1px solid var(--border-subtle)', margin: '20px 0', fontSize: '0.88rem' }}>
                  <code>{lines.slice(1, -1).join('\n')}</code>
                </pre>
              );
            } else if (block.startsWith('> ')) {
              const quote = block.replace(/^>\s*/gm, '');
              contentElement = (
                <blockquote key={`bq-${i}`} style={{ borderLeft: '3px solid var(--text-primary)', padding: '14px 18px', margin: '24px 0', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--bg-surface)', borderRadius: '0 4px 4px 0' }}>
                  {renderInlineText(quote)}
                </blockquote>
              );
            } else if (block.startsWith('- ') || block.startsWith('* ') || block.match(/^\d+\.\s+/)) {
              const lines = block.split('\n');
              contentElement = (
                <ul key={`ul-${i}`} style={{ paddingLeft: '22px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {lines.map((li, liIndex) => {
                    const cleanLi = li.replace(/^([-*]|\d+\.)\s+/, '').trim();
                    return (
                      <li key={liIndex} style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        {renderInlineText(cleanLi)}
                      </li>
                    );
                  })}
                </ul>
              );
            } else {
              contentElement = (
                <p key={`p-${i}`} style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px' }}>
                  {renderInlineText(block)}
                </p>
              );
            }

            return (
              <React.Fragment key={i}>
                {videoElement}
                {contentElement}
              </React.Fragment>
            );
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
