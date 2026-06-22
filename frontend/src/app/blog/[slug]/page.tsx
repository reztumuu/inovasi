import React from 'react';
import { notFound } from 'next/navigation';
import BlogPostPageClient from '@/components/BlogPostPageClient';

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

const fallbackPosts: Record<string, BlogPost> = {
  'why-headless-architecture-is-the-future-of-web-development': {
    id: 1,
    title: 'Why Headless Architecture is the Future of Web Development',
    slug: 'why-headless-architecture-is-the-future-of-web-development',
    summary: 'Discover why separating your frontend from your backend can dramatically improve speed, scale, and multi-channel content delivery.',
    content: "### Introduction\n\nIn the early days of the web, monolithic frameworks ruled. Your HTML, database, and logic were tightly bound. While simple to launch, monoliths scale poorly when serving content to browsers, mobile apps, and third-party integrations simultaneously.\n\nEnter **Headless (Decoupled) Architecture**.\n\n### What is Headless?\n\nA headless architecture divides your system into two independent layers:\n1. **The Backend (Headless CMS / Custom API):** Handles data storage, business logic, and authentication.\n2. **The Frontend (The Head):** Fetches data from the API and renders it for any platform.\n\n### Core Benefits\n\n- **Improved Speed:** Frontends can be statically generated, caching content globally on CDNs.\n- **Technology Agnosticism:** Your backend can use Laravel while the frontend uses Next.js.\n- **Scalability:** High traffic won't bog down database servers.\n\n### Conclusion\n\nFor modern agencies, decoupled stacks provide the agility to launch premium, high-performance applications.",
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    author_name: 'John Doe (CTO)',
    created_at: '2026-06-19T12:00:00Z',
  },
  'deep-dive-laravel-13-features': {
    id: 2,
    title: 'A Deep Dive into Laravel 13 Features',
    slug: 'deep-dive-laravel-13-features',
    summary: "Laravel 13 introduces performance boosts, PHP 8.4 attributes for Eloquent, and streamlined routing.",
    content: "### The Evolution of Laravel\n\nLaravel continues to dominate the PHP ecosystem. In Laravel 13, the focus is squarely on performance and Developer Experience (DX).\n\n### 1. Eloquent Attributes\n\nLaravel 13 leverages PHP attributes for clean model configurations:\n\n```php\n#[Fillable(['name', 'email'])]\n#[Hidden(['password'])]\nclass User extends Authenticatable\n```\n\n### 2. Streamlined Routing\n\nLaravel 13 refines the directory layout and reduces framework overhead by 20%.\n\n### 3. Native Concurrency\n\nFirst-class support for parallel async tasks using PHP fibers.\n\n### Wrap Up\n\nLaravel 13 proves that PHP is modern, fast, and enterprise-ready.",
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Jane Smith (Lead Architect)',
    created_at: '2026-06-19T14:30:00Z',
  },
  'designing-premium-web-ux': {
    id: 3,
    title: 'Designing Premium Web UX: Best Practices for Modern Applications',
    slug: 'designing-premium-web-ux',
    summary: 'Make your applications feel tactile and premium using modern design patterns and cohesive design systems.',
    content: "### Aesthetics Sell Software\n\nUsers form opinions in less than 50 milliseconds. A generic interface looks like an MVP. A premium interface feels trustworthy.\n\n### 1. Depth and Layering\n\nCreate visual hierarchy through subtle shadows, overlapping elements, and careful spacing. Cards should feel like physical objects.\n\n### 2. Purposeful Color Usage\n\nUse a primary accent color consistently and reserve secondary colors for specific UI states.\n\n### 3. Tactile Micro-Interactions\n\nWhen a user hovers over a card, transition the border, lift it vertically, and scale internal icons. Keep transitions short (0.2s–0.3s).\n\n### 4. Typography as Design\n\nTreat typography as a core design element. Apply proper scale, line heights, and contrast.",
    image_url: 'https://images.unsplash.com/photo-1541462608141-2ffb6cc0e9e0?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Alice Johnson (Lead Designer)',
    created_at: '2026-06-20T01:00:00Z',
  },
};

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/posts/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('API server down');
    }
    const json = await res.json();
    return json.data;
  } catch {
    return fallbackPosts[slug] || null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return <BlogPostPageClient post={post} />;
}