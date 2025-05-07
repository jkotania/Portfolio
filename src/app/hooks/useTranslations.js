"use client";
import { useEffect, useState } from "react";
import { translations } from "../i18n/translations";

export function useTranslation() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const detectedLang = userLang.startsWith("pl") ? "pl" : "en";
    setLang(detectedLang);
  }, []);

  return {
    t: translations[lang],
    lang,
    setLang: (newLang) => {
      setLang(newLang);
    },
  };
}
