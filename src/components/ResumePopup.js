// components/ResumePopup.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { useTranslation } from "@/app/hooks/useTranslations";

export default function ResumePopup({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  if (!isOpen) return null;
  const handleDownload = async (language, url) => {
    const fileName = url.split("/").pop();

    try {
      trackEvent("download_cv", "resume", `${fileName}_${language}`);

      setTimeout(() => {
        window.open(url, "_blank");

        trackEvent("download_cv_success", "resume", `${fileName}_${language}`);
      }, 100);
    } catch (error) {
      console.error("Błąd podczas pobierania CV:", error);
      trackEvent(
        "download_cv_error",
        "resume",
        `${error.message || "unknown_error"}`
      );
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-xl relative "
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-2xl font-bold text-mono-primary mb-8 text-center">
            {t.resumePopup.title}
          </h2>

          <div className="space-y-4">
            <motion.a
              href="CV/2yrsDev_JKotania_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() =>
                handleDownload("EN", "CV/2yrsDev_JKotania_Resume.pdf")
              }
              className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-mono-primary transition-colors"
            >
              <span className="flex items-center gap-3">
                <FaFileDownload />
                {t.resumePopup.englishVersion}
              </span>
              <span className="text-sm text-gray-400">EN</span>
            </motion.a>

            <motion.a
              href="CV/2lataDev_JKotania_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() =>
                handleDownload("PL", "CV/2lataDev_JKotania_Resume.pdf")
              }
              className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-mono-primary transition-colors"
            >
              <span className="flex items-center gap-3">
                <FaFileDownload />
                {t.resumePopup.polishVersion}
              </span>
              <span className="text-sm text-gray-400">PL</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
