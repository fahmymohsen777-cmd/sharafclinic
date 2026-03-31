import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useCountUp } from '../hooks/useCountUp';
import { totalVictims } from '../data/massacres';
import { fetchAndAnalyzeLiveEvents } from '../services/LiveArchiveService';

const navLinks = [
  { id: 'counter', ar: 'الإحصائيات', en: 'Statistics' },
  { id: 'timeline', ar: 'الجدول الزمني', en: 'Timeline' },
  { id: 'map', ar: 'خريطة المجازر', en: 'Massacre Map' },
  { id: 'media', ar: 'أرشيف الوثائق', en: 'Media Archive' },
  { id: 'sources', ar: 'المصادر', en: 'Sources' },
];

export const Navbar = () => {
  const { lang, toggleLang, isAr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [finalTotal, setFinalTotal] = useState(totalVictims);
  
  // Total Counter Logic dynamically updates when finalTotal changes
  const { count, start } = useCountUp(finalTotal, 3000);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    
    // Fetch live stats to match LiveCounter exactly
    fetchAndAnalyzeLiveEvents().then((events) => {
      const liveVictims = events.reduce((acc, curr) => acc + (Number(curr.victims) || 0), 0);
      setFinalTotal(totalVictims + liveVictims);
    });
    
    // Start counter automatically on mount
    start();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [start]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-blood/30 shadow-lg shadow-blood/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-3 h-8 bg-blood rounded-sm" />
          <span className={`font-bold text-white text-sm tracking-wide ${isAr ? 'font-arabic text-base' : 'font-display'}`}>
            {isAr ? 'أرشيف الشهداء' : 'MARTYRS ARCHIVE'}
          </span>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm text-gray-400 hover:text-blood-light transition-colors duration-200 ${isAr ? 'font-arabic' : ''}`}
            >
              {isAr ? link.ar : link.en}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Header Live Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-blood/10 border border-blood/30 rounded text-blood-light font-display">
            <span className="text-xs uppercase tracking-widest leading-none mt-0.5">{isAr ? 'الشهداء:' : 'VICTIMS:'}</span>
            <span className="font-bold flex items-center" dir="ltr">
              <span>+</span>
              <span>{count.toLocaleString('en-US')}</span>
            </span>
          </div>

          {/* Lang toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blood/50 text-blood-light text-xs font-medium hover:bg-blood/10 transition-all duration-200"
          >
            <span>🌐</span>
            <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
          </motion.button>

          {/* Mobile menu */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/95 border-t border-blood/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm text-gray-400 hover:text-white py-2 border-b border-white/5 text-${isAr ? 'right' : 'left'} ${isAr ? 'font-arabic' : ''}`}
                >
                  {isAr ? link.ar : link.en}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
