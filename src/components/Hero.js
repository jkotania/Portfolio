"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "@/app/hooks/useTranslations";

export default function Hero() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (headingRef.current && !isMobile) {
      const rect = headingRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      id="about"
      className="relative min-h-[100dvh] flex items-center justify-center"
    >
      <div className="relative container mx-auto px-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={headingRef}
          >
            <h1
              className={`text-6xl lg:text-7xl font-bold relative pb-4 lg:pb-12 cursor-default ${
                isMobile ? "text-white" : "text-transparent"
              }`}
              style={
                !isMobile
                  ? {
                      WebkitTextStroke: "1px white",
                      backgroundImage: isHovering
                        ? `radial-gradient(
                            circle 120px at ${mousePosition.x}px ${mousePosition.y}px, 
                            white, transparent
                          )`
                        : "none",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      transition: "background-position 0.1s ease",
                    }
                  : {}
              }
            >
              {t.hero.title}
            </h1>
          </div>

          <p className="text-xl text-mono-secondary mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/jkotania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-secondary hover:text-mono-primary transition-colors text-2xl"
              aria-label={t.hero.links.github}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/jan-kotania/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-secondary hover:text-mono-primary transition-colors text-2xl"
              aria-label={t.hero.links.linkedin}
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:jkotania14@gmail.com"
              className="text-mono-secondary hover:text-mono-primary transition-colors text-2xl"
              aria-label={t.hero.links.email}
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
