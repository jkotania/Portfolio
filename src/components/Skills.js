"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiFlutter,
  SiFirebase,
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTailwindcss,
  SiFigma,
  SiSupabase,
  SiGit,
  SiMongodb,
  SiVercel,
  SiTensorflow,
  SiPython,
} from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import { EASE, SectionHeading } from "./motion/primitives";
import { useTranslation } from "@/app/hooks/useTranslations";

const GROUPS = [
  {
    key: "frontend",
    span: "md:col-span-4",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "group-hover/skill:text-white" },
      { name: "React", icon: SiReact, color: "group-hover/skill:text-[#61DAFB]" },
      { name: "JavaScript", icon: SiJavascript, color: "group-hover/skill:text-[#F7DF1E]" },
      { name: "HTML5", icon: SiHtml5, color: "group-hover/skill:text-[#E34F26]" },
      { name: "CSS3", icon: SiCss, color: "group-hover/skill:text-[#1572B6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "group-hover/skill:text-[#38B2AC]" },
    ],
  },
  {
    key: "mobile",
    span: "md:col-span-2",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "group-hover/skill:text-[#02569B]" },
      { name: "Python", icon: SiPython, color: "group-hover/skill:text-[#3776AB]" },
      { name: "TensorFlow", icon: SiTensorflow, color: "group-hover/skill:text-[#FF6F00]" },
      { name: "Firebase", icon: SiFirebase, color: "group-hover/skill:text-[#FFCA28]" },
    ],
  },
  {
    key: "backend",
    span: "md:col-span-3",
    skills: [
      { name: "Supabase", icon: SiSupabase, color: "group-hover/skill:text-[#3ECF8E]" },
      { name: "MongoDB", icon: SiMongodb, color: "group-hover/skill:text-[#47A248]" },
      { name: "Git", icon: SiGit, color: "group-hover/skill:text-[#F05032]" },
      { name: "Vercel", icon: SiVercel, color: "group-hover/skill:text-white" },
    ],
  },
  {
    key: "design",
    span: "md:col-span-3",
    skills: [
      { name: "Figma", icon: SiFigma, color: "group-hover/skill:text-[#F24E1E]" },
      { name: "No-Code", icon: AiOutlinePlus, color: "group-hover/skill:text-green-500" },
    ],
  },
];

// Sets the spotlight position for the card's radial highlight.
function handleSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.skills.name} subtitle={t.skills.subtitle} />

        <div className="grid gap-4 md:grid-cols-6">
          {GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.key}
              onPointerMove={handleSpotlight}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE, delay: groupIndex * 0.1 }}
              className={`group/card relative overflow-hidden rounded-[28px] border border-white/10 bg-mono-surface p-6 md:p-8 ${group.span}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--x) var(--y), rgba(255,255,255,0.07), transparent 60%)",
                }}
              />
              <h3 className="relative text-lg font-medium text-mono-primary">
                {t.skills.groups[group.key]}
              </h3>
              <ul className="relative mt-6 flex flex-wrap gap-3">
                {group.skills.map(({ name, icon: Icon, color }) => (
                  <li key={name} className="group/skill">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                      <Icon
                        aria-hidden="true"
                        className={`h-6 w-6 text-mono-secondary transition-colors duration-300 ${color}`}
                      />
                      <span className="text-sm text-mono-primary">{name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
