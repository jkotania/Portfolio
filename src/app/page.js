// src/pages/page.js
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden w-full">
            <div className="fixed inset-0 dot-pattern opacity-50"></div>
            <div className="relative z-10 w-full">
                <Navbar />
                <main className="overflow-x-hidden">
                    <Hero />
                    <Projects />
                    <Skills />
                    <Contact />
                </main>
            </div>
        </div>
    );
}




