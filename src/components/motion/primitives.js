"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

// Reveals text word by word, each word sliding up from behind a mask.
export function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.06,
  inView = true,
}) {
  const MotionTag = motion[Tag] ?? motion.span;
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "visible", viewport: { once: true, amount: 0.6 } }
    : { animate: "visible" };

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// Fades and lifts content in once it scrolls into view.
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

// Pulls its child slightly toward the cursor, then springs back.
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  const handleMove = (event) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 md:mb-16">
      <RevealText
        as="h2"
        text={title}
        className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
      />
      {subtitle && (
        <FadeIn delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-mono-secondary md:text-lg">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
