"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { EASE, SectionHeading } from "./motion/primitives";
import ProjectTitle from "./ProjectTitle";
import { projects } from "@/data/projects";
import { useTranslation } from "@/app/hooks/useTranslations";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

// The screenshot: a slow zoom as the card scrolls in, and a "View" bubble that follows the cursor.
function ProjectMedia({ project, href, cursorLabel }) {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 28 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 28 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  const handleMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <Link
      href={href}
      tabIndex={-1}
      aria-hidden="true"
      className="block h-full"
    >
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={(event) =>
          event.pointerType === "mouse" && setIsHovering(true)
        }
        onPointerLeave={() => setIsHovering(false)}
        className="relative h-64 overflow-hidden rounded-2xl bg-black sm:h-80 md:h-full md:cursor-none"
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src={project.image.src}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
          />
        </motion.div>

        <AnimatePresence>
          {isHovering && (
            <motion.span
              style={{ x, y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pointer-events-none absolute left-0 top-0 -ml-12 -mt-12 hidden h-24 w-24 items-center justify-center rounded-full bg-mono-primary text-sm font-medium text-mono-background md:flex"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

function ProjectCard({ project, index, total, progress, isDesktop, t, lang }) {
  const content = project[lang];
  const href = `/projekty/${project.slug}`;
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.03;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <motion.article
      style={{
        scale: isDesktop ? scale : 1,
        top: isDesktop ? `calc(6rem + ${index * 20}px)` : undefined,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group/card relative mb-6 w-full origin-top overflow-hidden rounded-[28px] border border-white/10 bg-mono-surface p-3 shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.85)] md:sticky md:mb-8 md:min-h-[480px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-[100px]"
        style={{ background: project.color }}
      />

      <div className="relative grid gap-6 md:min-h-[456px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <div className="flex flex-col justify-between p-4 md:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-mono-secondary">
                {content.type}
              </span>
              <span className="text-sm text-mono-secondary">{content.role}</span>
            </div>
            <h3
              translate="no"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              <Link href={href}>
                <ProjectTitle title={project.title} />
              </Link>
            </h3>
            <p className="mt-3 text-base leading-relaxed text-mono-secondary">
              {content.description}
            </p>
            <ul className="mt-5 space-y-2">
              {content.features.slice(0, 3).map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-mono-primary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: project.color }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-mono-primary"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={href}
                className="group/link inline-flex items-center gap-3 rounded-full bg-mono-primary py-2.5 pl-5 pr-2.5 text-sm font-medium text-mono-background transition-colors hover:bg-white"
              >
                {t.projects.caseStudy}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mono-background text-mono-primary">
                  <FaArrowRight
                    className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/ext inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-mono-primary transition-colors hover:border-white/40"
                >
                  {t.projects.visit}
                  <FaArrowRight
                    className="h-3 w-3 -rotate-45 transition-transform duration-300 group-hover/ext:rotate-0"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        <ProjectMedia
          project={project}
          href={href}
          cursorLabel={t.projects.cursor}
        />
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t, lang } = useTranslation();
  const containerRef = useRef(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} />

        <div ref={containerRef} className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              isDesktop={isDesktop}
              t={t}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
