// components/Navbar.js
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';
import ResumePopup from './ResumePopup';

export default function Navbar() {
    const [isResumePopupOpen, setIsResumePopupOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleResumeClick = () => {
        setIsMobileMenuOpen(false);
        setIsResumePopupOpen(true);
    };

    const navLinks = [
        { href: "#about", text: "About me" },
        { href: "#projects", text: "Projects" },
        { href: "#skills", text: "Skills" },
        { href: "#contact", text: "Contact" }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] backdrop-blur-sm border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2"
                        >
                            <FaCode className="text-2xl text-mono-primary" />
                            <span className="text-xl font-bold text-mono-primary">
                                Jan Kotania
                            </span>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative px-4 py-2 text-mono-secondary hover:text-mono-primary transition-colors group"
                                >
                                    {link.text}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mono-primary transform scale-x-0 transition-transform group-hover:scale-x-100" />
                                </motion.a>
                            ))}
                            <motion.button
                                onClick={handleResumeClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="px-6 py-2 border border-mono-primary text-mono-primary hover:bg-mono-primary hover:text-mono-background rounded-lg transition-colors duration-300"
                            >
                                Resume
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-mono-secondary hover:text-mono-primary transition-colors"
                            >
                                {isMobileMenuOpen ? (
                                    <FaTimes className="text-2xl" />
                                ) : (
                                    <FaBars className="text-2xl" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            height: isMobileMenuOpen ? 'auto' : 0
                        }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="py-4 space-y-2">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-mono-secondary hover:text-mono-primary hover:bg-mono-accent/10 rounded-lg transition-colors"
                                >
                                    {link.text}
                                </a>
                            ))}
                            <motion.button
                                onClick={handleResumeClick}
                                whileTap={{ scale: 0.95 }}
                                className="w-full mt-4 px-6 py-2 border border-mono-primary text-mono-primary hover:bg-mono-primary hover:text-mono-background rounded-lg transition-all duration-300"
                            >
                                Resume
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </nav>
            <ResumePopup
                isOpen={isResumePopupOpen}
                onClose={() => setIsResumePopupOpen(false)}
            />
        </>
    );
}