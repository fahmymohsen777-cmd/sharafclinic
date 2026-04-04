"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const FacebookIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" /></svg>;
const InstagramIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const TwitterIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009Z" /></svg>;
const LinkedinIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 – Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src="/doctors/Website-logo.webp" alt="Logo" width={48} height={48} className="rounded-xl" />
              <div>
                <p className="font-extrabold text-white text-lg font-heading leading-tight">د. خالد شرف</p>
                <p className="text-xs text-slate-400">طب وتجميل الأسنان</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              عيادة متخصصة في طب وتجميل الأسنان في قلب القاهرة منذ عام 1998 بأحدث التقنيات وأمهر الأطباء.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FacebookIcon, href: "https://www.facebook.com/Dr.Khaled.Sharaf" },
                { icon: InstagramIcon, href: "https://www.instagram.com/drkhaledsharaf/" },
                { icon: TwitterIcon, href: "http://x.com/Khaled__Sharaf" },
                { icon: LinkedinIcon, href: "https://www.linkedin.com/in/khaledsharaf" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 font-heading">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "الأطباء", href: "/doctors" },
                { label: "الخدمات", href: "/#services" },
                { label: "إنجازاتنا", href: "/#achievements" },
                { label: "اتصل بنا", href: "/contact" },
                { label: "احجز موعد", href: "/book" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 font-heading">معلومات التواصل</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a href="tel:01008080358" className="text-slate-400 hover:text-primary transition-colors">01008080358</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a href="mailto:sharafdentalclinic@gmail.com" className="text-slate-400 hover:text-primary transition-colors break-all">
                  sharafdentalclinic@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-slate-400">41 شارع الفلكي، أمام المعامل المركزية لوزارة الصحة – بالقرب من ميدان التحرير – القاهرة</span>
              </li>
            </ul>
          </div>

          {/* Column 4 – Hours */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 font-heading">مواعيد العمل</h4>
            <ul className="space-y-2 text-sm">
              {[
                { day: "السبت", time: "6:00 م - 11:00 م" },
                { day: "الأحد", time: "6:00 م - 11:00 م" },
                { day: "الإثنين", time: "6:00 م - 11:00 م" },
                { day: "الثلاثاء", time: "6:00 م - 11:00 م" },
                { day: "الأربعاء", time: "6:00 م - 11:00 م" },
                { day: "الخميس", time: "6:00 م - 11:00 م" },
                { day: "الجمعة", time: "إجازة" },
              ].map(({ day, time }) => (
                <li key={day} className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">{day}</span>
                  <span className={`font-medium ${time === "إجازة" ? "text-red-400" : "text-primary"}`} dir="rtl">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>Copyright © 2026 Fahmy Mohsen. All Rights Reserved</p>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>الكشف بمواعيد مسبقة — احجز الآن عبر الموقع أو اتصل بنا</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
