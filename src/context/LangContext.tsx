import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LangContextType {
  lang: Language;
  toggleLang: () => void;
  isAr: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'ar',
  toggleLang: () => {},
  isAr: true,
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('site-lang') as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('site-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <LangContext.Provider value={{ lang, toggleLang, isAr: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
