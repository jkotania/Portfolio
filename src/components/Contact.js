"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
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

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1, // Zmniejszono opóźnienie między elementami
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Płynniejsza krzywa przejścia
      },
    },
  };

  // Nowy wariant dla przycisków social media
  const socialButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
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
    const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (
      lastSubmissionTime &&
      currentTime - parseInt(lastSubmissionTime) < COOLDOWN_PERIOD
    ) {
      const remainingTime = Math.ceil(
        (parseInt(lastSubmissionTime) + COOLDOWN_PERIOD - currentTime) /
          1000 /
          60
      );
      setStatus({
        loading: false,
        success: false,
        error: `Please wait ${remainingTime} minute${
          remainingTime > 1 ? "s" : ""
        } before sending another message.`,
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

      // Log the response for debugging
      console.log("Response status:", response.status);

      // Get the response text first for debugging
      const responseText = await response.text();
      console.log("Response text:", responseText);

      // Try to parse as JSON if not empty
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid response format");
      }

      if (!response.ok) {
        throw new Error(
          data.error || `Request failed with status ${response.status}`
        );
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
        error: error.message || "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="min-h-[100dvh] flex flex-col justify-center snap-start py-16 px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="container mx-auto max-w-6xl bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Feel free to reach out if you&apos;re looking for a developer, have
            a question, or just want to connect.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <motion.div
                variants={itemVariants}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <FaEnvelope className="text-mono-primary text-xl" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-mono-primary font-medium">Email</h3>
                <a
                  href="mailto:jkotania14@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  jkotania14@gmail.com
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              <motion.div
                variants={itemVariants}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <FaMapMarkerAlt className="text-mono-primary text-xl" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-mono-primary font-medium">Location</h3>
                <p className="text-gray-400">Silesia, Poland</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={socialButtonVariants}
              className="flex space-x-4 pt-6"
            >
              <motion.a
                variants={socialButtonVariants}
                href="https://github.com/jkotania"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-white/20 transition-all"
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                variants={socialButtonVariants}
                href="https://www.linkedin.com/in/jan-kotania/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-white/20 transition-all"
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 text-mono-primary placeholder-gray-500 transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 text-mono-primary placeholder-gray-500 transition-colors"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="5"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 text-mono-primary placeholder-gray-500 transition-colors resize-none"
              />
            </motion.div>
            <motion.button
              variants={socialButtonVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status.loading}
              className={`w-full py-3 px-6 bg-white/5 border border-white/10 text-mono-primary hover:text-blue-400 hover:border-blue-400 rounded-xl transition-all duration-300 ${
                status.loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </motion.button>

            {status.success && (
              <motion.p
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center"
              >
                Message sent successfully!
              </motion.p>
            )}
            {status.error && (
              <motion.p
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center"
              >
                {status.error}
              </motion.p>
            )}
          </motion.form>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mt-8 text-sm"
        >
          Response time: Usually within 24 hours
        </motion.p>
      </motion.div>
    </section>
  );
}
