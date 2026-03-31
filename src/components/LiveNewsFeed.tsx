import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { fetchAndAnalyzeLiveEvents, LiveEvent } from '../services/LiveArchiveService';

export const LiveNewsFeed = () => {
  const { isAr } = useLang();
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getNews = async () => {
      if (mounted) setLoading(true);
      try {
        const liveArticles = await fetchAndAnalyzeLiveEvents();
        if (mounted) {
          setEvents(liveArticles);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in UI retrieving news:', err);
        if (mounted) setLoading(false);
      }
    };

    getNews();
    const interval = setInterval(getNews, 3600000); // refresh every hour

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading && events.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 flex justify-center py-10">
        <div className="animate-spin w-6 h-6 border-2 border-blood border-t-transparent rounded-full" />
      </div>
    );
  }

  // If NewsAPI gave a CORS error or hit limits and we have no cache
  if (events.length === 0) {
    return (
      <section className="relative px-4 sm:px-6 w-full max-w-4xl mx-auto mb-16 pt-8 z-10 text-center">
        <div className="bg-red-900/10 border-s-4 border-blood/50 rounded-r-xl p-5 backdrop-blur-md text-gray-400 font-arabic">
          🔴 لم نتمكن من جلب الأحداث اللحظية من (NewsAPI/Gemini) الآن. قد يكون ذلك بسبب وصولك للحد الأقصى أو قيود السيرفر. (جرب لاحقاً)
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-4 sm:px-6 w-full max-w-4xl mx-auto mb-16 pt-8 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-red-900/10 border-s-4 border-blood rounded-r-xl p-5 sm:p-6 backdrop-blur-md shadow-[0_0_30px_rgba(139,0,0,0.15)] overflow-hidden relative"
      >
        {/* Pulsing glow background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blood/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex items-center justify-center w-3 h-3">
            <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75" />
            <div className="relative w-2 h-2 bg-red-600 rounded-full" />
          </div>
          <h3 className={`text-blood-light font-bold text-lg sm:text-xl uppercase tracking-wider ${isAr ? 'font-arabic' : 'font-display'}`}>
            {isAr ? 'تغطية حية - رصد مستمر للمجازر فور وقوعها' : 'LIVE RADAR - Ongoing Atrocities Coverage'}
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {events.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-black/40 border border-white/5 rounded-lg p-4 hover:border-blood/50 hover:bg-black/60 transition-all cursor-pointer"
                onClick={() => window.open(item.url, '_blank')}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                  <div className="flex-1">
                    {/* Timestamp & Tag */}
                    <div className="flex items-center gap-2 mb-2 text-xs font-mono text-gray-500">
                      <span>{new Date(item.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-gray-700 mx-1">•</span>
                      <span>{item.source}</span>
                    </div>
                    {/* Event Summary (AI Generated) */}
                    <p className={`text-white text-base sm:text-lg font-medium leading-tight mb-2 ${isAr ? 'font-arabic' : 'font-display'}`}>
                      {item.aiSummary || item.title}
                    </p>
                  </div>
                  
                  {/* Stats Badges */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <div className="px-3 py-1 bg-blood/20 border border-blood/30 rounded-full text-blood text-sm font-bold flex items-center gap-1.5 whitespace-nowrap">
                      <span>☠</span>
                      <span dir="ltr">+{item.victims}</span>
                    </div>
                    {item.location && (
                      <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs flex items-center gap-1.5 whitespace-nowrap">
                        <span>📍</span>
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-gray-500 text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {isAr ? 'اضغط لقراءة المصدر الأصلي...' : 'Click to read original source...'}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
