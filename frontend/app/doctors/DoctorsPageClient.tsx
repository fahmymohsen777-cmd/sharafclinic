"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Briefcase } from "lucide-react";

const FacebookIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" /></svg>;
const InstagramIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const TwitterIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009Z" /></svg>;
const LinkedinIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

const doctors = [
  {
    id: 1,
    name: "د. خالد شرف",
    title: "طبيب تجميل الأسنان وعلاج اللثة",
    image: "/doctors/khaled.jpg",
    color: "from-sky-500 to-primary",
    social: {
      facebook: "https://www.facebook.com/Dr.Khaled.Sharaf",
      instagram: "https://www.instagram.com/drkhaledsharaf/",
      twitter: "http://x.com/Khaled__Sharaf",
      linkedin: "https://www.linkedin.com/in/khaledsharaf",
    },
    academicBio: [
      "تخرج من مدرسة دي لاسال (الفرير) الفرنسية في القاهرة – 1990",
      "حاصل على شهادة اللغة الفرنسية العلمية المتخصصة والتكنيكية من فرنسا – 1990",
      "تخرج من كلية طب الفم والأسنان – جامعة القاهرة – 1996",
      "ماجستير الاستعاضة الصناعية (الجزء الأول) – جامعة القاهرة – 1999",
      "ماجستير إدارة الأعمال – الأكاديمية البحرية تخصص تسويق – 2005",
      "حاصل على شهادة Champion في LEAN SIGMA – شركة IMS Health – 2011",
      "حاصل على شهادة مدرب في LEAN SIGMA – شركة IMS Health – 2012",
      "افتتح عيادة أسنان د. خالد شرف في عام 1998",
    ],
    workBio: [
      "مدقق المطالبات الطبية في شركة اليكو للتأمين (2000–2002)",
      "مدير مستحضرات في شركة فاكسيرا الطبية (2002–2004)",
      "مدير مديري المستحضرات في شركة فاكسيرا الطبية (2004–2005)",
      "مدير حساب البيع في شركة IMS Health (2005–2009)",
      "مدير العمليات في شركة IMS Health (2009–2011)",
      "مدير إدارة تنمية الأعمال في شركة IMS Health (2011–2013)",
      "مدير إدارة تنمية الأعمال في الشرق الأوسط – IMS Health (2013–2014)",
      "المدير العام لـ UNAMEX – الشركة الأمريكية المتحدة للخبراء (2014–2015)",
      "مدير عام المجلس المصري للشئون الصحية (2015 – الآن)",
      "نائب رئيس تحرير مجلة العلم والحياة (2016 – الآن)",
    ],
  },
  {
    id: 2,
    name: "د. أحمد مهران",
    title: "طبيب التقويم",
    image: "/doctors/ahmed-mahran.jpg",
    color: "from-violet-500 to-purple-400",
    social: {},
    academicBio: [],
    workBio: [],
  },
  {
    id: 3,
    name: "د. أحمد مجدي",
    title: "طبيب أسنان الأطفال",
    image: "/doctors/ahmed-magdi.jpg",
    color: "from-pink-500 to-rose-400",
    social: {},
    academicBio: [],
    workBio: [],
  },
  {
    id: 4,
    name: "د. هيثم عياد",
    title: "طبيب جراحة الفم والأسنان",
    image: "/doctors/Haitham-Ayad.jpeg",
    color: "from-emerald-500 to-teal-400",
    social: {},
    academicBio: [],
    workBio: [],
  },
  {
    id: 5,
    name: "د. هشام عصام",
    title: "طبيب علاج العصب",
    image: "/doctors/hesham-essam.jpg",
    color: "from-amber-500 to-orange-400",
    social: {},
    academicBio: [],
    workBio: [],
  },
  {
    id: 6,
    name: "د. محمود سامي",
    title: "طبيب جراحة الفم",
    image: "/doctors/mahmoud-samy.jpg",
    color: "from-indigo-500 to-blue-400",
    social: {},
    academicBio: [],
    workBio: [],
  },
];

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 bg-slate-100 hover:bg-primary text-slate-500 hover:text-white rounded-lg flex items-center justify-center transition-all hover:scale-110"
    aria-label={label}
  >
    <Icon className="w-4 h-4" />
  </a>
);

function DoctorCard({ doctor, index }: { doctor: typeof doctors[0]; index: number }) {
  const hasBio = doctor.academicBio.length > 0 || doctor.workBio.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 transition-all hover:-translate-y-1 ${hasBio ? "col-span-full" : ""}`}
    >
      {hasBio ? (
        /* Full card for Dr. Khaled */
        <div className="grid lg:grid-cols-3 gap-0">
          {/* Left – Image & info */}
          <div className="relative">
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${doctor.color}`} />
            <div className="p-8 flex flex-col items-center text-center h-full bg-slate-50">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-1">{doctor.name}</h3>
              <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${doctor.color} bg-clip-text text-transparent`}>
                {doctor.title}
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                {doctor.social.facebook && <SocialLink href={doctor.social.facebook} icon={FacebookIcon} label="Facebook" />}
                {doctor.social.instagram && <SocialLink href={doctor.social.instagram} icon={InstagramIcon} label="Instagram" />}
                {doctor.social.twitter && <SocialLink href={doctor.social.twitter} icon={TwitterIcon} label="X / Twitter" />}
                {doctor.social.linkedin && <SocialLink href={doctor.social.linkedin} icon={LinkedinIcon} label="LinkedIn" />}
              </div>
            </div>
          </div>

          {/* Middle – Academic */}
          <div className="p-8 border-l border-r border-slate-100">
            <div className="flex items-center gap-2 mb-5 text-primary">
              <GraduationCap className="w-5 h-5" />
              <h4 className="font-bold text-slate-900">الخبرات الأكاديمية</h4>
            </div>
            <ul className="space-y-3">
              {doctor.academicBio.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right – Work */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-5 text-primary">
              <Briefcase className="w-5 h-5" />
              <h4 className="font-bold text-slate-900">الخبرات العملية</h4>
            </div>
            <ul className="space-y-3">
              {doctor.workBio.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Simple card for other doctors */
        <div>
          <div className={`h-1.5 bg-gradient-to-r ${doctor.color}`} />
          <div className="p-8 text-center">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-5 shadow-lg">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=0EA5E9&color=fff&size=112`;
                }}
              />
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">{doctor.name}</h3>
            <p className={`text-sm font-semibold bg-gradient-to-r ${doctor.color} bg-clip-text text-transparent mb-4`}>
              {doctor.title}
            </p>

          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function DoctorsPageClient() {
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
              فريقنا الطبي
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-slate-900 mb-5">
              أطباؤنا <span className="text-gradient">المتخصصون</span>
            </h1>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
              فريق من أمهر الأطباء في تخصصاتهم يقدمون رعاية استثنائية لكل مريض.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, i) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 max-w-3xl mt-20 text-center">
        <div className="bg-gradient-to-r from-primary to-sky-400 rounded-3xl p-10 text-white">
          <h3 className="text-3xl font-heading font-extrabold mb-3">احجز مع طبيبك المفضل</h3>
          <p className="text-sky-100 mb-6">الكشف بمواعيد مسبقة فقط — اتصل أو احجز الآن</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/book"
              className="px-7 py-3 bg-white text-primary font-bold rounded-full hover:-translate-y-0.5 transition-all shadow-lg"
            >
              احجز عبر الموقع
            </a>
            <a
              href="tel:01008080358"
              className="px-7 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              01008080358
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
