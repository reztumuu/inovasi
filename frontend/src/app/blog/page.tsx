import type { Metadata } from 'next';
import BlogPageClient from '@/components/BlogPageClient';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://codevora.id/api/posts', { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('API server down');
    const json = await res.json();
    return json.data;
  } catch {
    return [
      {
        id: 1,
        title: 'Why Headless Architecture is the Future of Web Development',
        slug: 'why-headless-architecture-is-the-future-of-web-development',
        summary: 'Discover why separating your frontend from your backend can dramatically improve speed, scale, developer productivity, and multi-channel content delivery.',
        image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        author_name: 'John Doe (CTO)',
        created_at: '2026-06-19T12:00:00Z',
      },
      {
        id: 2,
        title: 'A Deep Dive into Laravel 13 Features',
        slug: 'deep-dive-laravel-13-features',
        summary: "Laravel 13 introduces incredible performance boosts, full PHP 8.4 attributes support for Eloquent models, and a streamlined routing architecture. Let's explore what's new.",
        image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        author_name: 'Jane Smith (Lead Architect)',
        created_at: '2026-06-19T14:30:00Z',
      },
      {
        id: 3,
        title: 'Designing Premium Web UX: Best Practices for 2026',
        slug: 'designing-premium-web-ux',
        summary: 'Make your applications feel tactile, premium, and interactive using modern design patterns. We discuss how to create cohesive design systems.',
        image_url: 'https://images.unsplash.com/photo-1541462608141-2ffb6cc0e9e0?auto=format&fit=crop&w=800&q=80',
        author_name: 'Alice Johnson (Lead Designer)',
        created_at: '2026-06-20T01:00:00Z',
      },
    ];
  }
}

export const metadata: Metadata = {
  title: 'Blog & Panduan Web Development',
  description: 'Artikel, tips, dan panduan terkini seputar jasa pembuatan website, arsitektur web modern, Next.js, Laravel, performa SEO, dan rekayasa perangkat lunak.',
  keywords: [
    'blog pembuatan website',
    'tutorial web development',
    'tips seo website',
    'nextjs tutorial',
    'laravel tips',
    'codevora blog'
  ],
  alternates: {
    canonical: 'https://codevora.id/blog',
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog & Wawasan Teknologi | Codevora',
    description: 'Kumpulan artikel, berita teknologi terkini, tips web development, dan panduan rekayasa software dari Codevora.',
    url: 'https://codevora.id/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          url: `https://codevora.id/blog/${post.slug}`,
          description: post.summary,
          image: post.image_url,
          datePublished: post.created_at,
          author: {
            '@type': 'Person',
            name: post.author_name || 'Codevora',
          },
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://codevora.id',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://codevora.id/blog',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPageClient posts={posts} />
    </>
  );
}