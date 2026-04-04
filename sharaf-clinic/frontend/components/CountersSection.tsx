"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Smile, Clock, Stethoscope, UserCheck } from "lucide-react";

const stats = [
  { icon: Smile, value: 6000, suffix: "+", label: "ابتسامة مشرقة", color: "text-primary", bg: "bg-sky-50" },
  { icon: Clock, value: 25, suffix: "+", label: "عاماً من الخبرة", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Stethoscope, value: 7, suffix: "", label: "تخصصات طبية", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: UserCheck, value: 6, suffix: "", label: "أطباء متخصصون", color: "text-violet-600", bg: "bg-violet-50" },
];

function useCountUp(target: number, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, enabled]);
  return count;
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(stat.value, 2000, visible);
  const Icon = stat.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:shadow-slate-200/60 transition-all hover:-translate-y-1 group"
    >
      <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-8 h-8 ${stat.color}`} />
      </div>
      <div className={`text-5xl font-extrabold font-heading ${stat.color} mb-2`}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <p className="text-slate-600 font-medium text-lg">{stat.label}</p>
    </motion.div>
  );
}

export default function CountersSection() {
  return (
    <section className="py-20 section-bg-alt">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            أرقام <span className="text-gradient">تتحدث عن نفسها</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            نفتخر بثقة آلاف المرضى الذين اختاروا عيادة د. خالد شرف منذ عام 1998
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
