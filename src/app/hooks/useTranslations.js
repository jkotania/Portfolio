"use client";
import { createContext, useContext } from "react";
import { translations } from "../i18n/translations";

// The language comes from the browser's Accept-Language header, read on the server in
// layout.js, so the page renders in the right language from the first paint.
const LanguageContext = createContext("en");

export function LanguageProvider({ lang, children }) {
  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation() {
  const lang = useContext(LanguageContext);

  return {
    t: translations[lang],
    lang,
  };
}
