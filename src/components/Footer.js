"use client";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { EASE } from "./motion/primitives";
import { useTranslation } from "@/app/hooks/useTranslations";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="overflow-hidden border-t border-white/[0.06] px-4 pt-16 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-mono-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Jan Kotania. {t.footer.rights}
        </p>
        <ul className="flex flex-wrap items-center gap-6">
          <li>
            <a
              href="https://github.com/jkotania"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-mono-primary"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jan-kotania/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-mono-primary"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 transition-colors hover:text-mono-primary"
            >
              {t.footer.backToTop}
              <FaArrowUp
                aria-hidden="true"
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </li>
        </ul>
      </div>

      <div className="mx-auto max-w-6xl overflow-hidden">
        <motion.p
          aria-hidden="true"
          translate="no"
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: "18%", opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="select-none whitespace-nowrap bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text pt-10 text-center text-[17vw] font-bold leading-none tracking-[-0.06em] text-transparent lg:text-[200px]"
        >
          Jan Kotania
        </motion.p>
      </div>
    </footer>
  );
}
