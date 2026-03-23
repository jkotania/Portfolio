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
import { useTranslation } from "@/app/hooks/useTranslations";

export default function Skills() {
  const { t } = useTranslation();
  const skills = [
    {
      name: "Next.js",
      icon: <SiNextdotjs className="w-12 h-12" />,
      color: "hover:text-white",
    },
    {
      name: "React",
      icon: <SiReact className="w-12 h-12" />,
      color: "hover:text-[#61DAFB]",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="w-12 h-12" />,
      color: "hover:text-[#F7DF1E]",
    },
    {
      name: "Python",
      icon: <SiPython className="w-12 h-12" />,
      color: "hover:text-[#3776AB]",
    },
    {
      name: "TensorFlow",
      icon: <SiTensorflow className="w-12 h-12" />,
      color: "hover:text-[#FF6F00]",
    },
    {
      name: "Flutter",
      icon: <SiFlutter className="w-12 h-12" />,
      color: "hover:text-[#02569B]",
    },
    {
      name: "Firebase",
      icon: <SiFirebase className="w-12 h-12" />,
      color: "hover:text-[#FFCA28]",
    },
    {
      name: "Supabase",
      icon: <SiSupabase className="w-12 h-12" />,
      color: "hover:text-[#3ECF8E]",
    },
    {
      name: "HTML5",
      icon: <SiHtml5 className="w-12 h-12" />,
      color: "hover:text-[#E34F26]",
    },
    {
      name: "CSS3",
      icon: <SiCss className="w-12 h-12" />,
      color: "hover:text-[#1572B6]",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="w-12 h-12" />,
      color: "hover:text-[#38B2AC]",
    },
    {
      name: "Figma",
      icon: <SiFigma className="w-12 h-12" />,
      color: "hover:text-[#F24E1E]",
    },
    {
      name: "Git",
      icon: <SiGit className="w-12 h-12" />,
      color: "hover:text-[#F05032]",
    },

    {
      name: "MongoDB",
      icon: <SiMongodb className="w-12 h-12" />,
      color: "hover:text-[#47A248]",
    },
    {
      name: "Vercel",
      icon: <SiVercel className="w-12 h-12" />,
      color: "hover:text-white",
    },
    {
      name: "No-Code",
      icon: (
        <div className="relative">
          <AiOutlinePlus className="w-12 h-12" />
        </div>
      ),
      color: "hover:text-green-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="skills"
      className="min-h-[80dvh] md:min-h-[85dvh] flex flex-col justify-center snap-start py-14 md:py-16 px-6"
    >
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-mono-primary mb-10 md:mb-12 text-center"
        >
          {t.skills.name}
        </motion.h2>
        <motion.div
          className="grid grid-cols-2  md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                className={`h-24 w-24 mx-auto mb-3 md:mb-4 flex items-center justify-center  bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg 
                                    transition-all duration-300 ${skill.color} hover:scale-110`}
              >
                {skill.icon}
              </motion.div>
              <h3 className="text-sm sm:text-base text-mono-primary font-medium">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
