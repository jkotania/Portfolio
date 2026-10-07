"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaGithub, FaTrophy } from "react-icons/fa";
import { EASE, FadeIn, Magnetic } from "./motion/primitives";
import ProjectTitle from "./ProjectTitle";
import { getNextProject, getProject } from "@/data/projects";
import { useTranslation } from "@/app/hooks/useTranslations";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease: EASE, delay },
});

function Section({ title, children }) {
  return (
    <FadeIn className="grid gap-4 border-t border-white/[0.08] py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <h2 className="text-xl font-semibold tracking-tight md:col-span-4 md:text-2xl">
        {title}
      </h2>
      <div className="max-w-2xl text-base leading-relaxed text-mono-secondary md:col-span-8 md:text-lg">
        {children}
      </div>
    </FadeIn>
  );
}

export default function CaseStudy({ slug }) {
  const { t, lang } = useTranslation();
  const project = getProject(slug);
  const next = getNextProject(slug);
  const content = project[lang];
  const imageRef = useRef(null);

  // The screenshot settles from a slight zoom as it scrolls into place.
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const details = [
    { label: t.caseStudy.role, value: content.role },
    { label: t.caseStudy.year, value: project.year },
    { label: t.caseStudy.stack, value: project.tech.join(", ") },
  ].filter((item) => item.value);

  return (
    <article className="relative px-4 pb-24 pt-32 sm:px-6 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
        style={{ background: project.color }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...fadeUp(0)}>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-mono-secondary transition-colors hover:text-mono-primary"
          >
            <FaArrowLeft
              aria-hidden="true"
              className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            {t.caseStudy.back}
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-10 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-mono-secondary">
            {content.type}
          </span>
          {content.award && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-sm font-medium text-amber-200">
              <FaTrophy className="h-3 w-3" aria-hidden="true" />
              {content.award}
            </span>
          )}
        </motion.div>

        <h1
          translate="no"
          className="mt-5 overflow-hidden pb-2 text-6xl font-bold tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          >
            <ProjectTitle title={project.title} />
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(0.4)}
          className="mt-6 max-w-2xl text-lg text-mono-secondary md:text-xl"
        >
          {content.summary}
        </motion.p>

        <motion.div
          {...fadeUp(0.55)}
          className="mt-12 flex flex-col gap-8 border-y border-white/[0.08] py-6 md:flex-row md:items-center md:justify-between"
        >
          <dl className="grid gap-6 sm:grid-cols-3 md:flex md:gap-14">
            {details.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-mono-secondary">{item.label}</dt>
                <dd className="mt-1 text-mono-primary">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-medium text-mono-primary transition-colors hover:border-white/40"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              {t.caseStudy.code}
            </a>
          )}
          {project.link && (
            <Magnetic>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-mono-primary py-3 pl-6 pr-3 font-medium text-mono-background transition-colors hover:bg-white"
              >
                {t.caseStudy.link}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mono-background text-mono-primary">
                  <FaArrowRight
                    aria-hidden="true"
                    className="h-3 w-3 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  />
                </span>
              </a>
            </Magnetic>
          )}
          </div>
        </motion.div>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-black md:mt-16"
        >
          <motion.div style={{ scale: imageScale }}>
            <Image
              src={project.image.src}
              width={project.image.width}
              height={project.image.height}
              alt={`${project.title}: ${content.summary}`}
              sizes="(min-width: 1152px) 1152px, 100vw"
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        <div className="mt-16 md:mt-24">
          <Section title={t.caseStudy.problem}>
            <p>{content.problem}</p>
          </Section>
          <Section title={t.caseStudy.approach}>
            <div className="space-y-5">
              {content.approach.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>
          {content.features?.length > 0 && (
            <Section title={t.caseStudy.features}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-base text-mono-primary"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: project.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {content.result && (
            <Section title={t.caseStudy.result}>
              <p className="text-mono-primary">{content.result}</p>
            </Section>
          )}
        </div>

        <FadeIn className="mt-8 grid gap-6 border-t border-white/[0.08] pt-14 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-6 rounded-[28px] border border-white/10 bg-mono-surface p-8">
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.caseStudy.cta}
            </p>
            <div>
              <Magnetic>
                <Link
                  href="/#contact"
                  className="inline-flex items-center rounded-full bg-mono-primary px-6 py-3 font-medium text-mono-background transition-colors hover:bg-white"
                >
                  {t.caseStudy.ctaLink}
                </Link>
              </Magnetic>
            </div>
          </div>

          <Link
            href={`/projekty/${next.slug}`}
            className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 p-8"
          >
            <Image
              src={next.image.src}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-40 transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 group-hover:opacity-60"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <span className="relative text-sm text-mono-secondary">
              {t.caseStudy.next}
            </span>
            <span
              translate="no"
              className="relative mt-1 flex items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl"
            >
              <ProjectTitle title={next.title} />
              <FaArrowRight
                aria-hidden="true"
                className="h-5 w-5 text-mono-primary transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </FadeIn>
      </div>
    </article>
  );
}
