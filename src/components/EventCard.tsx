import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Massacre, MassacreCategory } from '../data/massacres';
import { useLang } from '../context/LangContext';

interface EventCardProps {
  massacre: Massacre;
  index: number;
  side: 'left' | 'right';
  onMapClick?: (id: string) => void;
}

const categoryColors: Record<MassacreCategory, string> = {
  israeli: '#8B0000',
  american: '#b35400',
  other: '#444',
};

const categoryLabels: Record<MassacreCategory, { ar: string; en: string }> = {
  israeli: { ar: 'عمليات إسرائيلية', en: 'Israeli Operations' },
  american: { ar: 'عمليات أمريكية', en: 'US Operations' },
  other: { ar: 'أخرى', en: 'Other' },
};

export const EventCard = ({ massacre, index, side, onMapClick }: EventCardProps) => {
  const { isAr } = useLang();
  const [expanded, setExpanded] = useState(false);
  const color = categoryColors[massacre.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
      className={`relative flex ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-start w-full mb-8`}
    >
      {/* Half 1 (Year) */}
      <div className={`hidden md:block flex-1 ${side === 'left' ? 'text-end pe-6' : 'text-start ps-6'}`}>
        <span className="text-5xl font-bold font-display opacity-10 text-white select-none block mt-4">
          {massacre.year}
        </span>
      </div>

      {/* Middle Dot */}
      <div className="hidden md:flex flex-col items-center justify-start w-12 shrink-0 pt-6 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative flex items-center justify-center w-full"
        >
          <div className="w-4 h-4 rounded-full border-2 relative z-10" style={{ borderColor: color, backgroundColor: color + '33' }} />
          <div
            className="absolute rounded-full animate-ping opacity-40 z-0"
            style={{ width: '1rem', height: '1rem', backgroundColor: color }}
          />
        </motion.div>
      </div>

      {/* Half 2 (Card) */}
      <div className={`w-full md:flex-1 ${side === 'left' ? 'md:ps-6' : 'md:pe-6'}`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-surface-card border border-smoke rounded-xl p-5 sm:p-6 cursor-pointer transition-all duration-300 group"
          style={{ borderColor: expanded ? `${color}55` : undefined }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <span
                className="inline-block text-xs px-2.5 py-1 rounded-full font-semibold mb-2"
                style={{ backgroundColor: `${color}22`, color }}
              >
                {isAr ? categoryLabels[massacre.category].ar : categoryLabels[massacre.category].en}
              </span>
              <h3 className={`text-white font-bold text-base sm:text-lg leading-snug ${isAr ? 'font-arabic' : 'font-display'}`}>
                {isAr ? massacre.nameAr : massacre.nameEn}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <p className="text-gray-500 text-xs">{massacre.date}</p>
            </div>
          </div>

          {/* Location */}
          <div className={`flex items-center gap-2 text-xs text-gray-500 mb-3 ${isAr ? 'font-arabic flex-row-reverse justify-end' : ''}`}>
            <span>📍</span>
            <span>
              {isAr
                ? `${massacre.location.cityAr}، ${massacre.location.countryAr}`
                : `${massacre.location.cityEn}, ${massacre.location.countryEn}`}
            </span>
          </div>

          {/* Victims badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold mb-4"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <span>☠</span>
            <span>{massacre.victims.toLocaleString('en-US')}+</span>
            <span className={`font-normal text-xs text-gray-400 ${isAr ? 'font-arabic' : ''}`}>
              {isAr ? 'شهيد' : 'victims'}
            </span>
          </div>

          {/* Description */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : '3.5rem' }}
            className="overflow-hidden"
          >
            <p className={`text-gray-400 text-sm leading-relaxed ${isAr ? 'font-arabic text-base' : ''}`}>
              {isAr ? massacre.descriptionAr : massacre.descriptionEn}
            </p>
          </motion.div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-white/5">
            <a
              href={massacre.source.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`text-xs text-gray-600 hover:text-blood-light transition-colors flex items-center gap-1 ${isAr ? 'font-arabic' : ''}`}
            >
              <span>🔗</span>
              <span>{isAr ? 'المصدر:' : 'Source:'} {massacre.source.name}</span>
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onMapClick?.(massacre.id); }}
                className="text-xs text-gray-600 hover:text-white transition-colors"
              >
                🗺 {isAr ? 'الخريطة' : 'Map'}
              </button>
              <span className="text-gray-600 text-xs">{expanded ? '▲' : '▼'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
