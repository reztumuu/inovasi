'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'en' || saved === 'id') {
      setLanguageState(saved);
    } else {
      // Check browser settings
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'id') {
        setLanguageState('id');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  // Translation helper function that supports nested keys, e.g. "hero.title"
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary if key missing in Indonesian
        let enFallback: any = translations['en'];
        for (const enKey of keys) {
          if (enFallback && typeof enFallback === 'object' && enKey in enFallback) {
            enFallback = enFallback[enKey];
          } else {
            return path; // Return the path itself if completely missing
          }
        }
        return typeof enFallback === 'string' ? enFallback : path;
      }
    }

    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
