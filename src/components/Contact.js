"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslations";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";
import { EASE, FadeIn, Magnetic, RevealText } from "./motion/primitives";

const EMAIL = "jkotania14@gmail.com";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-mono-primary placeholder-mono-secondary/60 transition-colors hover:border-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastSubmissionTime = localStorage.getItem("lastEmailSubmission");
    const currentTime = new Date().getTime();
    const COOLDOWN_PERIOD = 5 * 60 * 1000;

    if (
      lastSubmissionTime &&
      currentTime - parseInt(lastSubmissionTime) < COOLDOWN_PERIOD
    ) {
      const remainingTime = Math.ceil(
        (parseInt(lastSubmissionTime) + COOLDOWN_PERIOD - currentTime) /
          1000 /
          60,
      );
      setStatus({
        loading: false,
        success: false,
        error: t.contact.form.cooldown(remainingTime),
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      localStorage.setItem("lastEmailSubmission", currentTime.toString());
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        loading: false,
        success: false,
        error: t.contact.form.error,
      });
    }
  };

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealText
          as="h2"
          text={t.contact.headline}
          className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl"
        />
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-xl text-base text-mono-secondary md:text-lg">
            {t.contact.subtitle}
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <FadeIn className="flex flex-col gap-10">
            <div>
              <p className="text-sm text-mono-secondary">
                {t.contact.email.label}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group relative text-2xl font-medium tracking-tight text-mono-primary sm:text-3xl"
                >
                  {EMAIL}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-mono-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={t.contact.copyEmail}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mono-secondary transition-colors hover:border-white/30 hover:text-mono-primary"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "done" : "copy"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? (
                        <FaCheck aria-hidden="true" />
                      ) : (
                        <FaRegCopy aria-hidden="true" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <span role="status" aria-live="polite" className="text-sm text-emerald-400">
                  {copied ? t.contact.copied : ""}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-mono-secondary">
                {t.contact.location.label}
              </p>
              <p className="mt-2 flex items-center gap-2 text-lg text-mono-primary">
                <FaMapMarkerAlt className="text-mono-secondary" aria-hidden="true" />
                {t.contact.location.value}
              </p>
            </div>

            <div className="flex gap-3">
              <Magnetic>
                <a
                  href="https://github.com/jkotania"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.hero.links.github}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-xl text-mono-secondary transition-colors hover:border-white/30 hover:bg-white/[0.04] hover:text-mono-primary"
                >
                  <FaGithub aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/jan-kotania/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.hero.links.linkedin}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-xl text-mono-secondary transition-colors hover:border-white/30 hover:bg-white/[0.04] hover:text-mono-primary"
                >
                  <FaLinkedin aria-hidden="true" />
                </a>
              </Magnetic>
            </div>

            <p className="flex items-center gap-2 text-sm text-mono-secondary">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {t.contact.responseTime}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-[28px] border border-white/10 bg-mono-surface p-5 sm:p-8"
            >
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm text-mono-secondary">
                  {t.contact.form.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm text-mono-secondary">
                  {t.contact.email.placeholder}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm text-mono-secondary">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: status.loading ? 1 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={status.loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-mono-primary px-6 py-4 font-medium text-mono-background transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                {status.loading && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-mono-background/30 border-t-mono-background"
                  />
                )}
                {status.loading ? t.contact.form.sending : t.contact.form.send}
              </motion.button>

              <div aria-live="polite" role="status">
                <AnimatePresence mode="wait">
                  {status.success && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400/10 px-4 py-3 text-emerald-400"
                    >
                      <FaCheck aria-hidden="true" />
                      {t.contact.form.success}
                    </motion.p>
                  )}
                  {status.error && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="rounded-xl bg-red-500/10 px-4 py-3 text-center text-red-400"
                    >
                      {status.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
