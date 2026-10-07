"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { EASE, Magnetic } from "./motion/primitives";
import { useTranslation } from "@/app/hooks/useTranslations";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease: EASE, delay },
});

function TitleLines({ lines }) {
  return lines.map((line, index) => (
    <span key={line} className="block overflow-hidden px-[0.05em] pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.3 + index * 0.12 }}
      >
        {line}
      </motion.span>
    </span>
  ));
}

export default function Hero() {
  const { t } = useTranslation();
  const titleRef = useRef(null);

  const [first, second] = t.hero.title.split(" & ");
  const lines = second ? [first, `& ${second}`] : [t.hero.title];

  // The spotlight is a filled copy of the heading, revealed through a mask at the cursor.
  const handleTitleMove = (event) => {
    const node = titleRef.current;
    if (!node || event.pointerType !== "mouse") return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--y", `${event.clientY - rect.top}px`);
    node.style.setProperty("--spot-duration", "0.3s");
    node.style.setProperty("--spot-opacity", "1");
  };

  // Fades out where the cursor left instead of disappearing at once.
  const hideSpotlight = () => {
    const node = titleRef.current;
    if (!node) return;
    node.style.setProperty("--spot-duration", "1.2s");
    node.style.setProperty("--spot-opacity", "0");
  };

  const socials = [
    {
      href: "https://github.com/jkotania",
      label: t.hero.links.github,
      icon: FaGithub,
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/jan-kotania/",
      label: t.hero.links.linkedin,
      icon: FaLinkedin,
      external: true,
    },
    {
      href: "mailto:jkotania14@gmail.com",
      label: t.hero.links.email,
      icon: FaEnvelope,
    },
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pb-20 pt-32"
    >
      <div className="relative mx-auto w-full max-w-5xl text-center">
        <motion.div {...fadeUp(0.1)} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-mono-secondary backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.hero.availability}
          </span>
        </motion.div>

        <div
          ref={titleRef}
          onPointerMove={handleTitleMove}
          onPointerLeave={hideSpotlight}
          className="relative mx-auto inline-block cursor-default"
        >
          <h1 className="hero-outline text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <TitleLines lines={lines} />
          </h1>
          <div
            aria-hidden="true"
            className="hero-spotlight pointer-events-none absolute inset-0 hidden text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] md:block"
          >
            <TitleLines lines={lines} />
          </div>
        </div>

        <motion.p
          {...fadeUp(0.65)}
          className="mx-auto mt-8 max-w-2xl text-base text-mono-secondary sm:text-lg md:text-xl"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          {...fadeUp(0.8)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-mono-primary px-7 py-3.5 font-medium text-mono-background transition-colors hover:bg-white"
            >
              {t.hero.ctaProjects}
              <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-mono-background text-mono-primary">
                <FaArrowRight
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-rotate-45"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 font-medium text-mono-primary transition-colors hover:border-white/40 hover:bg-white/[0.04]"
            >
              {t.hero.ctaContact}
            </a>
          </Magnetic>
        </motion.div>

        <motion.ul
          {...fadeUp(0.95)}
          className="mt-10 flex justify-center gap-2"
        >
          {socials.map(({ href, label, icon: Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-mono-secondary transition-colors hover:bg-white/[0.06] hover:text-mono-primary"
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.a
        href="#projects"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-mono-secondary md:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-mono-primary"
          />
        </span>
        {t.hero.scroll}
      </motion.a>
    </section>
  );
}
