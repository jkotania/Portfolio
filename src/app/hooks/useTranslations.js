'use client';
import { useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language');
    const userLang = navigator.language || navigator.userLanguage;
    const detectedLang = savedLang || (userLang.startsWith('pl') ? 'pl' : 'en');
    setLang(detectedLang);
    localStorage.setItem('preferred-language', detectedLang);
  }, []);

  return {
    t: translations[lang],
    lang,
    setLang: (newLang) => {
      setLang(newLang);
      localStorage.setItem('preferred-language', newLang);
    }
  };
}