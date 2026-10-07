"use client";
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import ResumePopup from "./ResumePopup";
import { EASE } from "./motion/primitives";
import { useTranslation } from "@/app/hooks/useTranslations";

export default function Navbar() {
  const { t } = useTranslation();
  const [isResumePopupOpen, setIsResumePopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hovered, setHovered] = useState(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Hide while scrolling down, show again as soon as the user scrolls up.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(current > previous && current > 160);
  });

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleResumeClick = () => {
    setIsMobileMenuOpen(false);
    setIsResumePopupOpen(true);
  };

  const navLinks = [
    { href: "/#about", text: t.navbar.about },
    { href: "/#projects", text: t.navbar.projects },
    { href: "/#skills", text: t.navbar.skills },
    { href: "/#contact", text: t.navbar.contact },
  ];

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-mono-primary"
      />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: isHidden && !isMobileMenuOpen ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        onFocusCapture={() => setIsHidden(false)}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav className="flex w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-[#0a0a0a]/70 py-2 pl-5 pr-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-mono-primary"
            translate="no"
          >
            <FaCode className="text-lg" aria-hidden="true" />
            <span className="font-semibold tracking-tight">Jan Kotania</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <ul
              className="flex items-center"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    className="relative z-10 block px-4 py-2 text-sm text-mono-secondary transition-colors hover:text-mono-primary"
                  >
                    {link.text}
                  </a>
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={handleResumeClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="ml-2 rounded-full bg-mono-primary px-5 py-2 text-sm font-medium text-mono-background transition-colors hover:bg-white"
            >
              {t.navbar.resume}
            </motion.button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? "mobile-menu" : undefined}
            aria-label={
              isMobileMenuOpen ? t.navbar.closeMenu : t.navbar.openMenu
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] md:hidden"
          >
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }
              }
              className="absolute h-[1.5px] w-4 bg-mono-primary"
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }
              }
              className="absolute h-[1.5px] w-4 bg-mono-primary"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center overscroll-contain bg-[#0a0a0a]/95 px-8 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                },
                hidden: {},
              }}
              className="space-y-2"
            >
              {navLinks.map((link) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    variants={{
                      hidden: { y: "100%" },
                      visible: {
                        y: 0,
                        transition: { duration: 0.6, ease: EASE },
                      },
                    }}
                    className="block py-1 text-5xl font-semibold tracking-tight text-mono-primary"
                  >
                    {link.text}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
            <motion.button
              type="button"
              onClick={handleResumeClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              exit={{ opacity: 0 }}
              className="mt-10 w-full rounded-full bg-mono-primary py-4 text-lg font-medium text-mono-background"
            >
              {t.navbar.resume}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumePopup
        isOpen={isResumePopupOpen}
        onClose={() => setIsResumePopupOpen(false)}
      />
    </>
  );
}
