"use client";
import { motion } from "framer-motion";
import { Trophy, Globe, Award } from "lucide-react";

const achievements = [
  {
    year: "2018",
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "أفضل عيادة أسنان في القاهرة",
    source: "مجلة الشرق الأوسط وأفريقيا – إنجلترا",
    desc: "شهادة تقييم علمي مبنية على رضا وسعادة المرضى بما يُقدَّم من جودة وتميُّز في العلاج.",
  },
  {
    year: "2019",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "أفضل عيادة أسنان في القاهرة",
    source: "مجلة الشرق الأوسط وأفريقيا – إنجلترا",
    desc: "تكريم مرة ثانية تأكيداً على الالتزام بأعلى معايير الجودة في خدمة المرضى.",
  },
  {
    year: "2021",
    icon: Trophy,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    title: "أفضل عيادة أسنان في القاهرة",
    source: "مجلة الصحة العالمية والدواء – إنجلترا",
    desc: "استمرار التميُّز والريادة في مجال طب الأسنان على المستوى الدولي.",
  },
  {
    year: "2025",
    icon: Trophy,
    color: "text-primary",
    bg: "bg-sky-50",
    border: "border-sky-200",
    title: "أفضل عيادة أسنان في القاهرة",
    source: "مجلة الشرق الأوسط وأفريقيا – إنجلترا",
    desc: "تتويج جديد في 2025 تأكيداً لمسيرة التميز المستمرة على مدار 25 عاماً.",
    highlight: true,
  },
];

const globalStats = [
  { value: "246", label: "مركزاً عالمياً", desc: "من ضمن أفضل 250 عيادة في العالم" },
  { value: "250", label: "عيادة عالمية", desc: "وفق موقع التقييم العالمي للعيادات" },
  { value: "مصر", label: "تمثيل دولي", desc: "ترشيح لتمثيل مصر في مؤتمر نيويورك للجودة" },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-amber-700 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full mb-4">
            🏆 إنجازاتنا
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            جوائز وتكريمات <span className="text-gradient">دولية</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            شهادة ثقة من أكبر المجلات الطبية العالمية تُعبِّر عن مدى رضا مرضانا ومستوى خدماتنا.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute top-0 left-1/2 -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-amber-200 via-sky-200 to-primary/30 hidden md:block" />

          <div className="space-y-10">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className={`p-6 rounded-2xl border ${a.highlight ? "bg-gradient-to-br from-sky-50 to-white border-sky-200 shadow-lg shadow-sky-100" : "bg-white border-slate-100 shadow-md"} transition-all hover:-translate-y-1 hover:shadow-lg`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-10 h-10 ${a.bg} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${a.color}`} />
                        </div>
                        {a.highlight && (
                          <span className="text-xs font-bold text-primary bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">أحدث جائزة ✨</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{a.title}</h3>
                      <p className={`text-sm font-medium mb-2 ${a.color}`}>{a.source}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
                    </div>
                  </div>

                  {/* Center year bubble */}
                  <div className="hidden md:flex w-16 h-16 flex-shrink-0 rounded-full bg-white border-2 border-primary/30 shadow-lg items-center justify-center z-10">
                    <span className="font-extrabold text-primary text-sm">{a.year}</span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-primary to-sky-400 rounded-3xl p-10 text-white text-center"
        >
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">حضور عالمي مميز</h3>
          <p className="text-sky-100 mb-8 max-w-lg mx-auto">
            تم ترشيح العيادة لتمثيل مصر في مؤتمر الاتجاهات العملية المستحدثة وجائزة الجودة العالمية بنيويورك.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {globalStats.map((s, i) => (
              <div key={i} className="bg-white/15 rounded-2xl p-5">
                <p className="text-3xl font-extrabold mb-1">{s.value}</p>
                <p className="font-semibold text-sm mb-1">{s.label}</p>
                <p className="text-sky-100 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
