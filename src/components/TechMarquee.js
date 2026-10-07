"use client";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTranslation } from "@/app/hooks/useTranslations";
import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiFirebase,
  SiSupabase,
  SiPython,
  SiTensorflow,
  SiFigma,
  SiVercel,
  SiMongodb,
} from "react-icons/si";

const ITEMS = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Flutter", icon: SiFlutter },
  { name: "Firebase", icon: SiFirebase },
  { name: "Supabase", icon: SiSupabase },
  { name: "Python", icon: SiPython },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Figma", icon: SiFigma },
  { name: "Vercel", icon: SiVercel },
  { name: "MongoDB", icon: SiMongodb },
];

// One pass of the logos is ~1800px, narrower than wide monitors (2560px+). Each row repeats
// them so a single row is always wider than the screen and the loop never shows a gap.
const REPEAT = 3;

function Row({ hidden = false }) {
  const items = Array.from({ length: REPEAT }, (_, copy) =>
    ITEMS.map((item) => ({ ...item, copy })),
  ).flat();

  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12"
    >
      {items.map(({ name, icon: Icon, copy }) => (
        <li
          key={`${name}-${copy}`}
          aria-hidden={copy > 0 || undefined}
          className="flex items-center gap-3 whitespace-nowrap text-lg text-mono-secondary"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {name}
        </li>
      ))}
    </ul>
  );
}

// Two identical rows scroll by half their width, so the loop has no visible seam.
// It pauses on hover, and the button lets keyboard and touch users stop it too.
export default function TechMarquee() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative border-y border-white/[0.06]">
      <div className="marquee-mask overflow-hidden py-6">
        <div
          className={`flex w-max animate-marquee ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          <Row />
          <Row hidden />
        </div>
      </div>
      {/* The whole strip is the button; the small pill on the right shows its state. */}
      <button
        type="button"
        onClick={() => setIsPaused((paused) => !paused)}
        aria-pressed={isPaused}
        aria-label={isPaused ? t.hero.playMarquee : t.hero.pauseMarquee}
        className="group absolute inset-0 flex cursor-pointer items-center justify-end pr-3 focus-visible:outline-offset-[-2px] motion-reduce:hidden"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-mono-background/80 text-mono-secondary backdrop-blur transition-colors group-hover:border-white/30 group-hover:text-mono-primary">
          {isPaused ? (
            <FaPlay className="h-2.5 w-2.5" aria-hidden="true" />
          ) : (
            <FaPause className="h-2.5 w-2.5" aria-hidden="true" />
          )}
        </span>
      </button>
    </div>
  );
}
