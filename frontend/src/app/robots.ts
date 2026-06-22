import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-extended',
          'cohere-ai',
          'PerplexityBot',
          'facebookexternalhit',
          'anthropic-ai',
          'Bingbot',
          'OAI-SearchBot'
        ],
        allow: '/',
      }
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://codevora.id'}/sitemap.xml`,
  };
}
