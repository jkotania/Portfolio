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
export default function TechMarquee() {
  return (
    <div className="marquee-mask group relative border-y border-white/[0.06] py-6">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
