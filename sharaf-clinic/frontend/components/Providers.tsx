"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { en } from "@/locales/en";
import { ar } from "@/locales/ar";

type LangContextType = {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  t: typeof en;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'en'|'ar'>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sharaf-lang') as 'en'|'ar';
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir = 'ltr'; // Ensure it stays LTR as requested by the user
    document.documentElement.lang = lang;
    localStorage.setItem('sharaf-lang', lang);
    setMounted(true);
  }, [lang]);

  const t = lang === 'ar' ? ar : en;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {!mounted ? <div style={{ visibility: 'hidden' }}>{children}</div> : children}
    </LangContext.Provider>
  );
}
