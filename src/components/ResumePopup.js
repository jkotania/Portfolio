// components/ResumePopup.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaFileDownload } from 'react-icons/fa';
import { useAnalytics } from '@/app/hooks/useAnalytics';


export default function ResumePopup({ isOpen, onClose }) {
    const { trackEvent } = useAnalytics();
    if (!isOpen) return null;
    const handleDownload = async (language, url) => {
        try {
            trackEvent(
                'cv_download_start',
                'resume',
                `resume_${language.toLowerCase()}_start`
            );

            const response = await fetch(url);
            if (response.ok) {
                // Sukces - plik istnieje i rozpoczęto pobieranie
                trackEvent(
                    'cv_download_success',
                    'resume',
                    `resume_${language.toLowerCase()}_success`
                );
            } else {
                // Błąd - plik nie istnieje
                trackEvent(
                    'cv_download_error',
                    'resume',
                    `resume_${language.toLowerCase()}_file_not_found`
                );
            }
        } catch (error) {
            // Błąd pobierania
            trackEvent(
                'cv_download_error',
                'resume',
                `resume_${language.toLowerCase()}_${error.message}`
            );
        }
    };


    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            scale: 0.8,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.3
            }
        },
        exit: {
            scale: 0.8,
            opacity: 0
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={backdropVariants}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    variants={modalVariants}
                    onClick={e => e.stopPropagation()}
                    className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <IoClose size={24} />
                    </button>

                    <h2 className="text-2xl font-bold text-mono-primary mb-4 text-center">
                        Select Resume Version
                    </h2>

                    <div className="space-y-4">
                        <motion.a
                            href="CV/2yrsDev_JKotania_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleDownload('EN', 'CV/2yrsDev_JKotania_Resume.pdf')}
                            className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-mono-primary transition-colors"
                        >
                            <span className="flex items-center gap-3">
                                <FaFileDownload />
                                English Version
                            </span>
                            <span className="text-sm text-gray-400">EN</span>
                        </motion.a>

                        <motion.a
                            href="CV/2lataDev_JKotania_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleDownload('PL', 'CV/2lataDev_JKotania_Resume.pdf')}
                            className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-mono-primary transition-colors"
                        >
                            <span className="flex items-center gap-3">
                                <FaFileDownload />
                                Polish Version
                            </span>
                            <span className="text-sm text-gray-400">PL</span>
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}