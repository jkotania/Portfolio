"use client";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/app/hooks/useTranslations";

// reducedMotion="user" turns transform animations off for people who ask their OS for less motion.
export default function Providers({ lang, children }) {
  return (
    <LanguageProvider lang={lang}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  );
}
