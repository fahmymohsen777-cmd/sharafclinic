import type { VercelRequest, VercelResponse } from '@vercel/node';

// GNews API - free tier, works on production servers (100 req/day)
// Register a free key at: https://gnews.io
// Falls back to Guardian API if GNews keys exhausted
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // GNews keys: VITE_GNEWS_API_KEY_1 ... _5
  const gnewsKeys = [
    process.env.VITE_GNEWS_API_KEY_1,
    process.env.VITE_GNEWS_API_KEY_2,
    process.env.VITE_GNEWS_API_KEY_3,
    process.env.VITE_GNEWS_API_KEY_4,
    process.env.VITE_GNEWS_API_KEY_5,
    process.env.VITE_GNEWS_API_KEY, // legacy single key
  ].filter(Boolean) as string[];

  const query = encodeURIComponent('مجزرة OR غارة OR شهداء غزة OR لبنان OR سوريا OR اليمن');

  // --- Try GNews first ---
  for (const apikey of gnewsKeys) {
    try {
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=ar&max=7&sortby=publishedAt&apikey=${apikey}`;
      const resp = await fetch(url);
      const data = await resp.json();

      if (resp.status === 403 || data.errors?.length) {
        console.warn('[GNews] key failed, rotating...');
        continue;
      }

      // Map GNews format to NewsAPI-compatible format
      const articles = (data.articles || []).map((a: any) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        publishedAt: a.publishedAt,
        source: { name: a.source?.name || 'وكالات' },
      }));

      res.setHeader('Cache-Control', 's-maxage=3600');
      return res.status(200).json({ articles });
    } catch (err: any) {
      console.error('[GNews] error:', err.message);
    }
  }

  // --- Fallback: The Guardian API (completely free, no restrictions) ---
  const guardianKey = process.env.VITE_GUARDIAN_API_KEY || 'test'; // 'test' works but limited
  try {
    const guardianUrl = `https://content.guardianapis.com/search?q=massacre+OR+bombing+OR+airstrike+Gaza+Lebanon+Syria+Yemen&api-key=${guardianKey}&page-size=7&order-by=newest&show-fields=trailText`;
    const resp = await fetch(guardianUrl);
    const data = await resp.json();
    const articles = (data.response?.results || []).map((a: any) => ({
      title: a.webTitle,
      description: a.fields?.trailText || '',
      url: a.webUrl,
      publishedAt: a.webPublicationDate,
      source: { name: 'The Guardian' },
    }));
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json({ articles });
  } catch (err: any) {
    console.error('[Guardian] error:', err.message);
  }

  return res.status(429).json({ error: 'All news APIs exhausted' });
}
