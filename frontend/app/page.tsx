import HeroSection from "@/components/HeroSection";
import CountersSection from "@/components/CountersSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import AchievementsSection from "@/components/AchievementsSection";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CountersSection />
      <ServicesSection />
      <WhyUsSection />
      <AchievementsSection />

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary to-sky-400">
        <div className="container mx-auto px-6 max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
            الكشف بمواعيد مسبقة
          </h2>
          <p className="text-sky-100 text-lg mb-8">
            احجز موعدك الآن عبر الموقع أو اتصل بنا مباشرة على 01008080358
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-full shadow-lg hover:-translate-y-1 transition-all"
            >
              احجز عبر الموقع
            </Link>
            <a
              href="tel:01008080358"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              اتصل بنا الآن
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
