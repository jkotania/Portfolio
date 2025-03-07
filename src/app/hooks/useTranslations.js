// src/hooks/useTranslation.js
'use client';
import { useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    setLang(userLang.startsWith('pl') ? 'pl' : 'en');
  }, []);

  return {
    t: translations[lang],
    lang
  };
}