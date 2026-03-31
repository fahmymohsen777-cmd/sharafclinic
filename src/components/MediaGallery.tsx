import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';

// Defining the classified evidence folders
const archiveFolders = [
  {
    id: 'gaza-2023',
    titleAr: 'ملف الإبادة: غزة (2023-2026)',
    titleEn: 'Genocide File: Gaza (2023-2026)',
    stamp: 'CLASSIFIED',
    color: 'bg-stone-800',
    links: [
      { nameAr: 'قاعدة بيانات المرصد الأورومتوسطي', nameEn: 'Euro-Med Monitor Database', url: 'https://euromedmonitor.org/ar/gaza' },
      { nameAr: 'تقارير أطباء بلا حدود (غزة)', nameEn: 'Doctors Without Borders (Gaza)', url: 'https://www.msf.org/palestine' },
      { nameAr: 'ملف محكمة العدل الدولية (جنوب أفريقيا)', nameEn: 'ICJ Case File (South Africa v. Israel)', url: 'https://www.icj-cij.org/' }
    ]
  },
  {
    id: 'iraq-2003',
    titleAr: 'غزو العراق وأسلحة الدمار',
    titleEn: 'Iraq Invasion & Cover-ups',
    stamp: 'DE-CLASSIFIED',
    color: 'bg-[#2a2722]',
    links: [
      { nameAr: 'مشروع تكلفة الحرب (جامعة براون)', nameEn: 'Costs of War Project (Brown University)', url: 'https://watson.brown.edu/costsofwar/costs/human/civilians/iraqi' },
      { nameAr: 'وثائق ويكيلكس (سجلات حرب العراق)', nameEn: 'WikiLeaks Iraq War Logs', url: 'https://wikileaks.org/irq/' },
      { nameAr: 'دراسة ذا لانسيت الطبية للوفيات', nameEn: 'The Lancet Mortality Study', url: 'https://www.thelancet.com/' }
    ]
  },
  {
    id: 'lebanon-1982',
    titleAr: 'لبنان: المجازر المستمرة',
    titleEn: 'Lebanon: Ongoing Massacres',
    stamp: 'EVIDENCE',
    color: 'bg-stone-900',
    links: [
      { nameAr: 'تحقيقات صبرا وشاتيلا (الأمم المتحدة)', nameEn: 'Sabra & Shatila Investigations (UN)', url: 'https://www.un.org/' },
      { nameAr: 'سجلات منظمة العفو الدولية (جنوب لبنان 2024)', nameEn: 'Amnesty International Records (2024)', url: 'https://www.amnesty.org/en/location/middle-east-and-north-africa/lebanon/' },
      { nameAr: 'هيومن رايتس ووتش - قانا 1996 و 2006', nameEn: 'HRW - Qana 1996 & 2006', url: 'https://www.hrw.org/middle-east/n-africa/lebanon' }
    ]
  },
  {
    id: 'vietnam-1965',
    titleAr: 'فيتنام والعامل البرتقالي',
    titleEn: 'Vietnam & Agent Orange',
    stamp: 'TOP SECRET',
    color: 'bg-[#282f1b]',
    links: [
      { nameAr: 'سجلات مجزرة ماي لاي', nameEn: 'My Lai Massacre Archives', url: 'https://en.wikipedia.org/wiki/My_Lai_massacre' },
      { nameAr: 'تقارير الصليب الأحمر (تأثير العامل البرتقالي)', nameEn: 'Red Cross Agent Orange Reports', url: 'https://www.redcross.org/' }
    ]
  },
  {
    id: 'us-drones',
    titleAr: 'برنامج طائرات الدرون السري',
    titleEn: 'Covert US Drone Program',
    stamp: 'RESTRICTED',
    color: 'bg-slate-900',
    links: [
      { nameAr: 'مكتب التحقيقات الصحفية (الضحايا المدنيون)', nameEn: 'The Bureau of Investigative Journalism (Drone Strikes)', url: 'https://www.thebureauinvestigates.com/projects/drone-war/' },
      { nameAr: 'تسريبات أوراق الدرون (The Intercept)', nameEn: 'The Drone Papers (The Intercept)', url: 'https://theintercept.com/drone-papers/' }
    ]
  },
  {
    id: 'iran-2026',
    titleAr: 'إيران وآخر الاستهدافات (2026)',
    titleEn: 'Iran & Recent Strikes (2026)',
    stamp: 'RECENT',
    color: 'bg-red-950',
    links: [
      { nameAr: 'تقارير الهلال الأحمر الإيراني (زاهدان)', nameEn: 'Iranian Red Crescent Reports (Zahedan)', url: 'https://rcs.ir/en' },
      { nameAr: 'متابعة حقوقية للاغتيالات (أصفهان)', nameEn: 'HRW Assassination Tracking (Isfahan)', url: 'https://www.hrw.org/middle-east/n-africa/iran' }
    ]
  }
];

export const MediaGallery = () => {
  const { isAr } = useLang();
  const [selectedFolder, setSelectedFolder] = useState<typeof archiveFolders[0] | null>(null);

  // Helper component for the Folder SVG shape
  const FolderIcon = ({ color, stamp }: { color: string, stamp: string }) => (
    <div className={`relative w-full aspect-[4/3] rounded-sm flex flex-col items-center justify-center shadow-lg transition-transform overflow-hidden ${color} border border-white/10 group-hover:border-blood/40`}>
      {/* Folder Tab (Visual element) */}
      <div className={`absolute top-0 left-0 w-1/3 h-4 rounded-tl-sm rounded-tr-xl border-t border-l border-r border-white/10 ${color} z-10`}></div>
      <div className={`absolute top-4 left-0 w-full h-[calc(100%-1rem)] rounded-b-sm rounded-tr-sm border-t border-white/20 ${color} z-20 flex items-center justify-center p-4`}>
        {/* Red Stamp */}
        <div className={`rotate-[-15deg] border-4 border-blood/60 text-blood/60 px-4 py-1 text-xl sm:text-2xl font-bold tracking-[8px] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all filter drop-shadow-[0_0_8px_rgba(139,0,0,0.5)] bg-black/30 backdrop-blur-sm ${isAr ? 'font-display' : 'font-display'}`}>
          {stamp}
        </div>
      </div>
      {/* Blood splatter or dirty texture overlay could go here */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay opacity-30 z-30 pointer-events-none"></div>
    </div>
  );

  return (
    <section id="media" className="py-24 bg-[#050505] px-4 sm:px-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 text-white"
        >
          <span className="text-blood text-xs tracking-[4px] uppercase mb-4 block font-body">● EVIDENCE VAULT</span>
          <h2 className={`text-3xl sm:text-5xl font-bold mb-4 ${isAr ? 'font-arabic' : 'font-display'}`}>
            {isAr ? 'أرشيف الوثائق والأدلة' : 'Archives & Evidence'}
          </h2>
          <p className={`text-gray-400 max-w-2xl mx-auto leading-relaxed ${isAr ? 'font-arabic text-lg' : ''}`}>
            {isAr 
              ? 'مستندات سرية، روابط لقواعد بيانات المنظمات الحقوقية، وأدلة استقصائية تدين مجرمي الحرب وتشهد على الإبادة. اختر ملفاً لفتح الأدلة.' 
              : 'Classified documents, human rights NGO databases, and investigative evidence explicitly condemning war criminals. Select a file to review evidence.'}
          </p>
        </motion.div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {archiveFolders.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedFolder(folder)}
            >
              <FolderIcon color={folder.color} stamp={folder.stamp} />
              <div className="mt-4 text-center">
                <h3 className={`text-xl font-bold text-gray-200 group-hover:text-blood transition-colors ${isAr ? 'font-arabic' : 'font-display'}`}>
                  {isAr ? folder.titleAr : folder.titleEn}
                </h3>
                <p className="text-gray-600 text-sm mt-1 font-mono">{folder.links.length} {isAr ? 'وثائق مرفقة' : 'Attached Documents'}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Document Modal */}
        <AnimatePresence>
          {selectedFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedFolder(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111] border border-white/10 shadow-[0_0_50px_rgba(139,0,0,0.2)] rounded-xl w-full max-w-lg overflow-hidden relative"
              >
                {/* Modal Header */}
                <div className="bg-[#1a1a1a] p-6 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blood/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                  <h3 className={`text-2xl font-bold text-white relative z-10 ${isAr ? 'font-arabic' : 'font-display'}`}>
                    {isAr ? selectedFolder.titleAr : selectedFolder.titleEn}
                  </h3>
                  <button 
                    onClick={() => setSelectedFolder(null)}
                    className="text-gray-500 hover:text-blood transition-colors rounded-full p-2 hover:bg-white/5 relative z-10"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content (Typewriter doc style) */}
                <div className="p-6 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-[#e6e2d3] relative">
                  <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} border-2 border-blood text-blood px-2 py-1 text-xs font-bold font-mono opacity-80 rotate-[-5deg]`}>
                    CONFIDENTIAL
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <p className={`text-stone-800 text-sm font-bold mb-6 ${isAr ? 'font-arabic' : 'font-display uppercase tracking-widest'}`}>
                      {isAr ? 'المرفقات الاستقصائية للتحقيق:' : 'INVESTIGATIVE ATTACHMENTS:'}
                    </p>
                    
                    {selectedFolder.links.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 p-4 border border-stone-400/30 rounded bg-stone-100 hover:bg-stone-200 hover:border-stone-500 transition-all font-mono text-stone-900"
                      >
                        <span className="text-blood text-xl mt-0.5 opacity-70 group-hover:opacity-100">🔗</span>
                        <div>
                          <p className={`font-bold ${isAr ? 'font-arabic text-lg' : ''}`}>
                            {isAr ? link.nameAr : link.nameEn}
                          </p>
                          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                            <span className="text-green-700/80">✔ Verified Source</span> 
                            <span>•</span> 
                            <span className="truncate max-w-[150px] sm:max-w-xs">{new URL(link.url).hostname}</span>
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Warning Footer */}
                  <div className="mt-8 pt-4 border-t border-stone-800/20 text-center">
                    <p className={`text-blood text-xs font-bold ${isAr ? 'font-arabic' : 'font-display'}`}>
                      {isAr ? 'تحذير: الروابط المرفقة تحتوي على مشاهد وأدلة قاسية جداً.' : 'WARNING: ATTACHED LINKS CONTAIN EXTREMELY GRAPHIC EVIDENTIARY MATERIAL.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MediaGallery;
