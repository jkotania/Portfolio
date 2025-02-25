// src/components/Contact.js
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Contact() {
    return (
        <section id="contact" className="min-h-[100dvh] flex flex-col justify-center snap-start py-16 px-6">
            <div className="container mx-auto">
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-mono-primary mb-4">
                        Kontakt
                    </h2>
                    <p className="text-mono-secondary">
                        Jestem otwarty na nowe projekty i współpracę. Napisz do mnie!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Informacje kontaktowe */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-mono-accent/10 flex items-center justify-center">
                                <FaEnvelope className="text-mono-primary text-xl" />
                            </div>
                            <div>
                                <h3 className="text-mono-primary font-medium">Email</h3>
                                <a href="mailto:kontakt@example.com"
                                   className="text-mono-secondary hover:text-mono-primary transition-colors">
                                    kontakt@example.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-mono-accent/10 flex items-center justify-center">
                                <FaPhone className="text-mono-primary text-xl" />
                            </div>
                            <div>
                                <h3 className="text-mono-primary font-medium">Telefon</h3>
                                <a href="tel:+48123456789"
                                   className="text-mono-secondary hover:text-mono-primary transition-colors">
                                    +48 123 456 789
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-mono-accent/10 flex items-center justify-center">
                                <FaMapMarkerAlt className="text-mono-primary text-xl" />
                            </div>
                            <div>
                                <h3 className="text-mono-primary font-medium">Lokalizacja</h3>
                                <p className="text-mono-secondary">Warszawa, Polska</p>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-6">
                            <a href="https://github.com"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-10 h-10 rounded-lg bg-mono-accent/10 flex items-center justify-center text-mono-secondary hover:text-mono-primary hover:bg-mono-accent/20 transition-colors">
                                <FaGithub className="text-xl" />
                            </a>
                            <a href="https://linkedin.com"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-10 h-10 rounded-lg bg-mono-accent/10 flex items-center justify-center text-mono-secondary hover:text-mono-primary hover:bg-mono-accent/20 transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Formularz kontaktowy */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Imię i nazwisko"
                                className="w-full px-4 py-3 bg-mono-accent/10 border border-mono-accent/20 rounded-lg focus:outline-none focus:border-mono-primary text-mono-primary placeholder-mono-secondary/70 transition-colors"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 bg-mono-accent/10 border border-mono-accent/20 rounded-lg focus:outline-none focus:border-mono-primary text-mono-primary placeholder-mono-secondary/70 transition-colors"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Twoja wiadomość"
                                rows="5"
                                className="w-full px-4 py-3 bg-mono-accent/10 border border-mono-accent/20 rounded-lg focus:outline-none focus:border-mono-primary text-mono-primary placeholder-mono-secondary/70 transition-colors resize-none"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-6 bg-mono-accent/10 border border-mono-primary text-mono-primary hover:bg-mono-primary hover:text-mono-background rounded-lg transition-colors duration-300"
                        >
                            Wyślij wiadomość
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}