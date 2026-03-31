import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { massacres, MassacreCategory } from '../data/massacres';
import { useLang } from '../context/LangContext';
import { EventCard } from './EventCard';

export const TimelineSection = () => {
  const { isAr } = useLang();
  const [filter, setFilter] = useState<MassacreCategory | 'all'>('all');

  const categories = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'israeli', ar: 'إسرائيلية', en: 'Israeli' },
    { id: 'american', ar: 'أمريكية', en: 'American' },
  ];

  const filteredMassacres = useMemo(() => {
    let sorted = [...massacres].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (filter !== 'all') {
      sorted = sorted.filter((m) => m.category === filter);
    }
    return sorted;
  }, [filter]);

  return (
    <section id="timeline" className="relative py-24 bg-surface px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-5xl font-bold text-white mb-6 ${isAr ? 'font-arabic' : 'font-display'}`}
          >
            {isAr ? 'التسلسل الزمني للجرائم' : 'Timeline of Atrocities'}
          </motion.h2>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id as MassacreCategory | 'all')}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                  filter === c.id
                    ? 'bg-blood text-white border border-blood'
                    : 'bg-transparent text-gray-400 border border-white/10 hover:border-blood/30 hover:text-white'
                } ${isAr ? 'font-arabic' : ''}`}
              >
                {isAr ? c.ar : c.en}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-blood/20 to-transparent -translate-x-1/2" />

          {/* Events */}
          <div className="flex flex-col gap-0 md:gap-12">
            {filteredMassacres.map((massacre, index) => (
              <EventCard
                key={massacre.id}
                massacre={massacre}
                index={index}
                side={index % 2 === 0 ? 'left' : 'right'}
                onMapClick={(id) => {
                  document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
                  // We could dispatch an event here to highlight it on the map
                  window.dispatchEvent(new CustomEvent('highlightMapMarker', { detail: id }));
                }}
              />
            ))}
          </div>
          
          {filteredMassacres.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              {isAr ? 'لا توجد بيانات متاحة لهذا التصنيف.' : 'No data available for this category.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
