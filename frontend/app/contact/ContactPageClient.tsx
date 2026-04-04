"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const workingHours = [
  { day: "السبت", time: "6:00 م - 11:00 م", open: true },
  { day: "الأحد", time: "6:00 م - 11:00 م", open: true },
  { day: "الإثنين", time: "6:00 م - 11:00 م", open: true },
  { day: "الثلاثاء", time: "6:00 م - 11:00 م", open: true },
  { day: "الأربعاء", time: "6:00 م - 11:00 م", open: true },
  { day: "الخميس", time: "6:00 م - 11:00 م", open: true },
  { day: "الجمعة", time: "إجازة", open: false },
];

const contacts = [
  {
    icon: Phone,
    label: "هاتف",
    value: "01008080358",
    link: "tel:01008080358",
    color: "text-primary",
    bg: "bg-sky-50",
    action: "اتصل الآن",
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: "01008080358",
    link: "https://wa.me/201008080358",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    action: "تواصل عبر واتساب",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "sharafdentalclinic@gmail.com",
    link: "mailto:sharafdentalclinic@gmail.com",
    color: "text-violet-600",
    bg: "bg-violet-50",
    action: "أرسل رسالة",
  },
  {
    icon: MapPin,
    label: "العنوان",
    value: "41 شارع الفلكي، أمام المعامل المركزية لوزارة الصحة – بالقرب من ميدان التحرير – القاهرة",
    link: "https://maps.app.goo.gl/keCHSXp65Xk18v2V6",
    color: "text-amber-600",
    bg: "bg-amber-50",
    action: "افتح في الخريطة",
  },
];

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50 pb-16">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-sky-50 border border-sky-200 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              📞 تواصل معنا
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-slate-900 mb-5">
              نحن هنا <span className="text-gradient">لمساعدتك</span>
            </h1>
            <p className="text-slate-600 text-xl max-w-xl mx-auto">
              تواصل معنا عبر أي قناة تفضلها أو زورنا مباشرة في عيادتنا بالقاهرة.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left – Contact info + Hours */}
          <div className="space-y-6">
            {/* Contact cards */}
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${c.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{c.label}</p>
                    <p className="text-slate-900 font-semibold text-sm break-all mb-2">{c.value}</p>
                    <a
                      href={c.link}
                      target={c.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`text-xs font-bold ${c.color} hover:underline`}
                    >
                      {c.action} →
                    </a>
                  </div>
                </motion.div>
              );
            })}

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900">مواعيد العمل</h3>
              </div>
              <div className="space-y-2">
                {workingHours.map(({ day, time, open }) => (
                  <div key={day} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                    <span className="text-slate-600 font-medium text-sm">{day}</span>
                    <span className={`text-sm font-bold ${open ? "text-primary" : "text-red-500"}`}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
                <strong>⚠️ ملاحظة:</strong> الكشف بمواعيد مسبقة فقط — يُرجى الحجز مسبقاً.
              </div>
            </motion.div>
          </div>

          {/* Right – Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Google Maps embed */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-96">
              <iframe
                src="https://maps.google.com/maps?q=41+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D9%81%D9%84%D9%83%D9%8A+%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9&output=embed&z=17"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/keCHSXp65Xk18v2V6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all"
            >
              <MapPin className="w-5 h-5" />
              افتح الموقع في Google Maps
            </a>

            {/* Book CTA */}
            <div className="bg-gradient-to-r from-primary to-sky-400 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-heading font-extrabold mb-2">جاهز لتحجز موعدك؟</h3>
              <p className="text-sky-100 text-sm mb-5">اختر التاريخ والوقت المناسب لك</p>
              <a
                href="/book"
                className="block w-full py-3.5 bg-white text-primary font-bold rounded-2xl hover:-translate-y-0.5 transition-all shadow-lg"
              >
                احجز موعدك الآن
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
