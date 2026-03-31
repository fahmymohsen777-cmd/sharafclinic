import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useCountUp } from '../hooks/useCountUp';
import { totalVictims, israeliVictims, americanVictims, massacres } from '../data/massacres';
import { fetchAndAnalyzeLiveEvents } from '../services/LiveArchiveService';

interface CounterCardProps {
  label_ar: string;
  label_en: string;
  target: number;
  color: string;
  delay: number;
}

const CounterCard = ({ label_ar, label_en, target, color, delay }: CounterCardProps) => {
  const { isAr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { count, start } = useCountUp(target, 2800);

  useEffect(() => {
    if (inView) start();
  }, [inView, target]); // Added target dependency so it re-animates when live victims load

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${color}33` }}
      className="relative bg-surface-card border border-smoke rounded-xl p-6 sm:p-8 text-center overflow-hidden group transition-all duration-300"
      style={{ borderColor: inView ? `${color}33` : undefined }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${color}11 0%, transparent 70%)` }}
      />

      {/* Number */}
      <div className={`text-4xl sm:text-5xl font-bold mb-2 font-display`} style={{ color }}>
        {count.toLocaleString('en-US')}
        <span className="text-2xl ml-1" style={{ color }}>+</span>
      </div>

      {/* Label */}
      <p className={`text-gray-400 text-sm ${isAr ? 'font-arabic text-base' : ''}`}>
        {isAr ? label_ar : label_en}
      </p>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-700"
        style={{ background: inView ? `linear-gradient(90deg, transparent, ${color}, transparent)` : 'transparent' }}
      />
    </motion.div>
  );
};

const LiveCounter = () => {
  const { isAr } = useLang();
  const [liveStats, setLiveStats] = useState({ victims: 0, incidents: 0 });

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const events = await fetchAndAnalyzeLiveEvents();
        let addedVictims = 0;
        events.forEach(e => {
          addedVictims += Number(e.victims) || 0;
        });
        setLiveStats({ victims: addedVictims, incidents: events.length });
      } catch (err) {
        // Silent catch for counter
      }
    };
    fetchLiveStats();
  }, []);

  const stats = [
    {
      label_ar: 'إجمالي الشهداء الموثقين',
      label_en: 'Total Documented Victims',
      target: totalVictims + liveStats.victims,
      color: '#8B0000',
      delay: 0,
    },
    {
      label_ar: 'شهداء العمليات الإسرائيلية',
      label_en: 'Israeli Operations Victims',
      target: israeliVictims + liveStats.victims, // Assuming recent events are primarily tracked here
      color: '#c0392b',
      delay: 0.15,
    },
    {
      label_ar: 'شهداء العمليات الأمريكية',
      label_en: 'US Operations Victims',
      target: americanVictims,
      color: '#e67e22',
      delay: 0.3,
    },
    {
      label_ar: 'مجازر وعمليات موثقة',
      label_en: 'Documented Massacres',
      target: massacres.length + liveStats.incidents,
      color: '#888888',
      delay: 0.45,
    },
  ];

  return (
    <section id="counter" className="relative py-20 px-4 sm:px-6 bg-ash">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className={`text-blood text-xs tracking-[4px] uppercase mb-4 block ${isAr ? 'font-arabic tracking-wider text-sm' : ''}`}>
            {isAr ? '● إحصائيات حية' : '● Live Statistics'}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold text-white ${isAr ? 'font-arabic' : 'font-display'}`}>
            {isAr ? 'الأرقام التي لا تكذب' : 'Numbers That Cannot Lie'}
          </h2>
          <p className={`text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed ${isAr ? 'font-arabic text-base' : ''}`}>
            {isAr
              ? 'مستخلصة من تقارير منظمات دولية معتمدة كهيومن رايتس ووتش، ومنظمة العفو الدولية، والأمم المتحدة، وبرنامج أوبسالا للنزاعات.'
              : 'Compiled from verified reports by Human Rights Watch, Amnesty International, United Nations agencies, and the Uppsala Conflict Data Program (UCDP).'}
          </p>
        </motion.div>

        {/* Counter grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <CounterCard key={s.label_en} {...s} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={`text-center text-gray-600 text-xs mt-8 ${isAr ? 'font-arabic text-sm' : ''}`}
        >
          {isAr
            ? '* الأرقام الحد الأدنى للشهداء المدنيين الموثقين فقط — الأرقام الفعلية قد تكون أعلى بكثير'
            : '* Figures represent minimum documented civilian casualties only — actual numbers may be significantly higher'}
        </motion.p>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blood/50 to-transparent" />
    </section>
  );
};

export default LiveCounter;
