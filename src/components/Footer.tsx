import React from 'react';
import { useLang } from '../context/LangContext';

export const Footer = () => {
  const { isAr } = useLang();

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Red accent line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-blood" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
        <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blood" />
            <div className={`font-bold text-white tracking-widest ${isAr ? 'font-arabic text-xl' : 'font-display text-lg'}`}>
                {isAr ? 'أرشيف الشهداء' : 'MARTYRS ARCHIVE'}
            </div>
        </div>

        <div className={`text-center md:text-left text-gray-500 text-sm max-w-lg ${isAr ? 'font-arabic md:text-right text-base leading-relaxed' : 'leading-relaxed'}`}>
            {isAr 
                ? 'هذا التوثيق تم إعداده لأغراض تاريخية وإنسانية بحتة. جميع الأرقام والبيانات مستندة إلى تقارير موثقة من منظمات حقوق إنسان دولية معترف بها كمنظمة العفو الدولية وهيومن رايتس ووتش.'
                : 'This documentation is created strictly for historical and humanitarian purposes. All figures and data are based on verified reports from recognized international human rights organizations such as Amnesty International and Human Rights Watch.'}
        </div>

        <div className="flex flex-col gap-2">
            <p className={`text-gray-400 text-xs font-semibold uppercase tracking-wider ${isAr ? 'font-arabic text-right' : 'text-left'}`}>
                {isAr ? 'أبرز المصادر' : 'Key Sources'}
            </p>
            <ul className={`text-gray-600 text-xs flex flex-col gap-1 ${isAr ? 'text-right' : 'text-left'}`}>
                <li className="hover:text-blood transition-colors cursor-pointer">Amnesty International</li>
                <li className="hover:text-blood transition-colors cursor-pointer">Human Rights Watch (HRW)</li>
                <li className="hover:text-blood transition-colors cursor-pointer">UN OCHA</li>
                <li className="hover:text-blood transition-colors cursor-pointer">UCDP (Uppsala Conflict Data)</li>
                <li className="hover:text-blood transition-colors cursor-pointer">Airwars</li>
            </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center mt-12 pt-6 border-t border-white/10 flex flex-col items-center justify-center gap-2">
        <p className="text-xs text-gray-500 font-mono">
          © {new Date().getFullYear()} Historical Atrocities Archive. Open Source.
        </p>
        <p className={`text-sm text-gray-400 mt-2 ${isAr ? 'font-arabic' : 'font-display tracking-widest'}`}>
          {isAr ? 'تطوير وتوثيق بواسطة' : 'DEVELOPED & ARCHIVED BY'} <span className="text-blood font-bold tracking-[2px]">F.M</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
