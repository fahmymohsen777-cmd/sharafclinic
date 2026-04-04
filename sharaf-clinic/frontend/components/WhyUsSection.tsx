"use client";
import { motion } from "framer-motion";
import { Users, Shield, Cpu, Camera, Star, Award } from "lucide-react";

const reasons = [
  { icon: Users, title: "فريق طبي مؤهل ومدرب", desc: "نخبة من أمهر أطباء الأسنان المتخصصين بخبرات عالمية واسعة.", color: "text-primary", bg: "bg-sky-50" },
  { icon: Shield, title: "تغطية معظم التخصصات", desc: "عيادة متكاملة تجمع تخصصات الأسنان المختلفة في مكان واحد.", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Cpu, title: "أحدث الأجهزة والتقنيات", desc: "استخدام أحدث معدات طب الأسنان والخامات الغربية عالية الجودة.", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Camera, title: "كشف بكاميرا متخصصة", desc: "تشخيص دقيق باستخدام كاميرا أسنان متخصصة مع تقرير علاج مفصل.", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Star, title: "تبييض وحشو بالليزر", desc: "نتائج استثنائية في وقت قياسي باستخدام تقنية الليزر الحديثة.", color: "text-rose-600", bg: "bg-rose-50" },
  { icon: Award, title: "نتائج مضمونة وابتسامات براقة", desc: "رضا تام لمرضانا مع ضمان النتائج وجودة العلاج في كل جلسة.", color: "text-indigo-600", bg: "bg-indigo-50" },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 section-bg-alt">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-bold text-primary bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full mb-4">
              لماذا نحن؟
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
              لماذا عيادة{" "}
              <span className="text-gradient">د. خالد شرف</span>؟
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              منذ عام 1998، نلتزم بتقديم أفضل رعاية طب الأسنان لمرضانا في القاهرة. ثقتكم أمانة نحرص على الوفاء بها في كل جلسة.
            </p>
            <a
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              احجز الآن
            </a>
          </motion.div>

          {/* Right side grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
                >
                  <div className={`w-11 h-11 ${r.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${r.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm group-hover:text-primary transition-colors">{r.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
