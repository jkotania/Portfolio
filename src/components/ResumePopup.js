"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { useTranslation } from "@/app/hooks/useTranslations";
import { EASE } from "./motion/primitives";

const VERSIONS = [
  { lang: "EN", href: "/CV/CV_Jan_Kotania_ENG.pdf", labelKey: "englishVersion" },
  { lang: "PL", href: "/CV/CV_Jan_Kotania_PL.pdf", labelKey: "polishVersion" },
];

export default function ResumePopup({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();

  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // While open: lock page scroll, close on Escape, keep Tab inside the dialog,
  // and give focus back to whatever opened it once it closes.
  useEffect(() => {
    if (!isOpen) return;
    // Remember the opener before moving focus into the dialog (autoFocus would run too early).
    const opener = document.activeElement;
    dialogRef.current?.querySelector("button")?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [isOpen]);

  // The link itself opens the PDF; this only records the download.
  const handleDownload = (language, url) => {
    const fileName = url.split("/").pop();
    trackEvent("download_cv", "resume", `${fileName}_${language}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center overscroll-contain bg-black/60 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-mono-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.resumePopup.close}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-mono-secondary transition-colors hover:bg-white/[0.06] hover:text-mono-primary"
            >
              <IoClose size={20} aria-hidden="true" />
            </button>

            <h2
              id="resume-title"
              className="mb-6 text-2xl font-semibold tracking-tight text-mono-primary"
            >
              {t.resumePopup.title}
            </h2>

            <div className="space-y-3">
              {VERSIONS.map((version, index) => (
                <motion.a
                  key={version.lang}
                  href={version.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, ease: EASE }}
                  onClick={() => handleDownload(version.lang, version.href)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-mono-primary transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <span className="flex items-center gap-3">
                    <FaFileDownload
                      aria-hidden="true"
                      className="text-mono-secondary transition-colors group-hover:text-mono-primary"
                    />
                    {t.resumePopup[version.labelKey]}
                  </span>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-mono-secondary">
                    {version.lang}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
