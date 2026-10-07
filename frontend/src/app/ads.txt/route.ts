import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  let adsContent = 'google.com, pub-7757744532538003, DIRECT, f08c47fec0942fa0\n';

  try {
    const res = await fetch('https://codevora.id/api/settings', { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      const settings = json.data;
      if (settings?.ads_txt && settings.ads_txt.trim()) {
        adsContent = settings.ads_txt.trim() + '\n';
      } else if (settings?.google_adsense_id) {
        const pubId = settings.google_adsense_id.replace(/^ca-/, '').trim();
        if (pubId) {
          adsContent = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
        }
      }
    }
  } catch {
    // fallback default
  }

  return new NextResponse(adsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
