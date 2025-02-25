"use client";
import React from 'react';
import { motion } from 'framer-motion';

// src/components/Skills.js
export default function Skills() {
    return (
        <section id="skills" className="min-h-[100dvh] flex flex-col justify-center snap-start py-16 px-6">
            <div className="container mx-auto">


            <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-mono-primary mb-12 text-center"
                >
                    Umiejętności
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Pojedyncza umiejętność */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="h-20 w-20 mx-auto mb-4 flex items-center justify-center bg-mono-accent/10 rounded-lg">
                            {/* Ikona umiejętności */}
                        </div>
                        <h3 className="text-mono-primary font-medium">Nazwa umiejętności</h3>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}