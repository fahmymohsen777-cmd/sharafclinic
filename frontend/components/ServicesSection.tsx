"use client";
import { motion } from "framer-motion";
import {
  Crown, Microscope, Baby, Users, Hash, Zap,
  Smile, Layers, CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "تركيبات الأسنان الثابتة",
    desc: "تركيبات عالية الجودة من أفضل الخامات العالمية تمنح أسنانك مظهراً طبيعياً ومتناسقاً.",
    color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100",
  },
  {
    icon: Zap,
    title: "تبييض الأسنان بالليزر",
    desc: "تبييض الأسنان بالليزر يجعل أسنانك أكثر بياضاً في ساعة واحدة باستخدام أحدث أجهزة الليزر.",
    color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100",
  },
  {
    icon: CheckCircle2,
    title: "الكشف الروتيني",
    desc: "فحص شامل لأسنانك بكاميرا متخصصة مع تقرير مفصل يمكن إرساله عبر البريد الإلكتروني.",
    color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100",
  },
  {
    icon: Layers,
    title: "إزالة الجير وتلميع الأسنان",
    desc: "تنظيف دقيق بجهاز متخصص لإزالة البلاك والجير الصعب مع تلميع يمنحك أسناناً ناعمة ومشرقة.",
    color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100",
  },
  {
    icon: Baby,
    title: "علاج أسنان الأطفال",
    desc: "رعاية متكاملة علاجية ووقائية لأسنان الأطفال بأسلوب ودود ومحبب يجعل التجربة ممتعة.",
    color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100",
  },
  {
    icon: Hash,
    title: "زراعة الأسنان",
    desc: "زرع الأسنان الحديث لاستبدال الأسنان المفقودة بتقنيات عالمية تضمن نتائج طويلة الأمد.",
    color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100",
  },
  {
    icon: Smile,
    title: "حشو الأسنان",
    desc: "حشوات طبية عالية الجودة بألوان تتناسب مع أسنانك الطبيعية لإغلاق التجاويف ومنع التسوس.",
    color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100",
  },
  {
    icon: Users,
    title: "تقويم الأسنان",
    desc: "تقويم الأسنان تحت إشراف استشاري متخصص لمنحك الابتسامة المثالية التي تحلم بها.",
    color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-primary bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full mb-4">
            خدماتنا
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            كل ما تحتاجه <span className="text-gradient">تحت سقف واحد</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            نقدم مجموعة شاملة من علاجات الأسنان الحديثة بأحدث الأجهزة وأفضل الخامات العالمية.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className={`p-6 bg-white rounded-2xl border hover:shadow-lg transition-all hover:-translate-y-1 group cursor-default ${s.border}`}
              >
                <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            احجز الآن للاستمتاع بهذه الخدمات
          </a>
        </motion.div>
      </div>
    </section>
  );
}
