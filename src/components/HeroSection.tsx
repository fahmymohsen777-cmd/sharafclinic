import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

const PARTICLE_COUNT = 80;

const HeroSection = () => {
  const { isAr } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.8 ? '#8B0000' : '#ffffff',
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollDown = () =>
    document.getElementById('counter')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ash"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Blood radial glow */}
      <div className="absolute inset-0 bg-radial-blood pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(139,0,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,0,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blood/50 bg-blood/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blood animate-pulse" />
          <span className={`text-blood-light text-xs tracking-widest uppercase ${isAr ? 'font-arabic tracking-normal text-sm' : ''}`}>
            {isAr ? 'توثيق حقوقي وتاريخي' : 'Historical & Human Rights Documentation'}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 ${
            isAr ? 'font-arabic' : 'font-display tracking-tight'
          }`}
        >
          {isAr ? (
            <>
              لن{' '}
              <span className="text-blood relative">
                يُنسى
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blood/60" />
              </span>
              <br />
              <span className="text-gray-300 text-3xl sm:text-5xl lg:text-6xl">التاريخ يشهد</span>
            </>
          ) : (
            <>
              NEVER{' '}
              <span className="text-blood relative">
                FORGOTTEN
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blood/60" />
              </span>
              <br />
              <span className="text-gray-300 text-3xl sm:text-5xl lg:text-5xl">History Bears Witness</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={`text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10 ${isAr ? 'font-arabic text-lg' : ''}`}
        >
          {isAr
            ? 'أرشيف توثيقي يجمع أبرز المجازر الموثقة تاريخياً، مع الأرقام الرسمية والمصادر المعتمدة من منظمات حقوق الإنسان الدولية. الذاكرة درعنا ضد التكرار.'
            : 'A documentary archive compiling historically documented massacres with official figures and sources verified by international human rights organizations. Memory is our shield against repetition.'}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,0,0,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollDown}
            className={`px-8 py-3.5 bg-blood hover:bg-blood-light text-white rounded-lg font-semibold text-sm transition-all duration-300 ${isAr ? 'font-arabic' : ''}`}
          >
            {isAr ? 'استعرض التوثيق' : 'Explore The Archive'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3.5 border border-white/20 hover:border-blood/50 text-gray-300 hover:text-white rounded-lg font-semibold text-sm transition-all duration-300 ${isAr ? 'font-arabic' : ''}`}
          >
            {isAr ? 'الخريطة التفاعلية' : 'Interactive Map'}
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 text-xs tracking-widest uppercase">
            {isAr ? 'مرر للأسفل' : 'Scroll'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-blood to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
