/// <reference types="vite/client" />
import axios from 'axios';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface LiveEvent {
  url: string;
  source: string;
  title: string;
  date: string;
  victims: number | string;
  location: string;
  isMassacre: boolean;
  aiSummary: string;
}

const CACHE_KEY = 'live_archive_cache_events';
const CACHE_TIMESTAMP_KEY = 'live_archive_timestamp';
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

export const fetchAndAnalyzeLiveEvents = async (): Promise<LiveEvent[]> => {
  // Check sessionStorage cache to prevent API exhaust
  try {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    const cachedTime = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cachedData && cachedTime) {
      const parsedData = JSON.parse(cachedData);
      const isExpired = Date.now() - parseInt(cachedTime) > CACHE_EXPIRY_MS;
      if (!isExpired && parsedData.length > 0) {
        return parsedData;
      }
    }
  } catch (e) {
    // Ignore cache parse errors
  }

  // Fetch live articles (using Arabic keywords for real-time reporting)
  let articles: any[] = [];
  try {
    const keywords = '(مجزرة OR غارة OR شهداء OR "قصف جوي" OR مدنيين) AND (غزة OR لبنان OR ايران OR سوريا OR اليمن)';
    
    // Some news APIs restrict CORS from browsers, axios will catch it if it fails
    // NewsAPI developer tier allows localhost but blocks production domains from browser
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: keywords,
        sortBy: 'publishedAt',
        language: 'ar',
        apiKey: NEWS_API_KEY,
        pageSize: 7 // Limit to 7 to prevent massive Gemini API spam
      }
    });
    articles = response.data.articles || [];
  } catch (err: any) {
    console.error('NewsAPI fetch error:', err.response?.data || err.message);
    // If it fails due to CORS or API key limits, return empty explicitly
    return [];
  }

  const liveEvents: LiveEvent[] = [];

  // Analyze articles intelligently with Gemini
  for (const article of articles) {
    if (!article.title) continue;

    // Remove source formatting like " - Al Jazeera"
    const cleanedTitle = article.title.split(' - ')[0];
    const textToAnalyze = `العنوان: ${cleanedTitle}\nالوصف: ${article.description || ''}`;

    try {
      const analysis = await analyzeWithGemini(textToAnalyze);
      if (analysis && analysis.isMassacre) {
        liveEvents.push({
          url: article.url,
          source: article.source?.name || 'وكالات',
          title: cleanedTitle,
          date: article.publishedAt,
          victims: analysis.victims,
          location: analysis.location,
          isMassacre: analysis.isMassacre,
          aiSummary: analysis.summary
        });
      }
    } catch (e) {
      console.error('Failed to analyze article with Gemini', e);
    }
  }

  // Cache final events (even if empty, to throttle requests, but we prefer caching actual results)
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(liveEvents));
  sessionStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

  return liveEvents;
};

const analyzeWithGemini = async (text: string) => {
  if (!GEMINI_API_KEY) {
    console.warn('No Gemini API Key found!');
    return null;
  }

  const systemInstruction = `
    You are an elite, objective Arabic analyst tracking brutal war crimes, civilian casualties, and massacres.
    You will receive a horrific news snippet in Arabic.
    Extract the casualty data into a strict raw JSON object without any formatting blocks or markdown.
    Format exactly matching:
    {
      "isMassacre": boolean (true if strike/bombing/civilians killed, false if generic political news),
      "victims": number (extract exact number of deaths/martyrs. If multiple, add them. If 'dozens' output 20, 'hundreds' 100. If 0 or unmentioned, output 0),
      "location": string (city/region/country in Arabic like "شمال غزة", "النبطية، لبنان"),
      "summary": string (a short punchy 1-sentence intense Arabic summary of what happened)
    }
  `;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: text }] }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    const data = await response.json();
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const rawText = data.candidates[0].content.parts[0].text;
      return JSON.parse(rawText);
    }
  } catch (error) {
    console.error('Gemini API call failed', error);
  }
  
  return null;
};
