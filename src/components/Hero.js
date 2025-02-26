"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PongBackground from './PongGameCanvas';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import TextWithGradients from '../app/text_with_gradients';



export default function Hero() {
    const textRef = useRef(null);
    const maskRef = useRef(null);
    const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!textRef.current || !maskRef.current) return;

        const updateDimensions = () => {
            const rect = textRef.current.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            // Uwzględnij rzeczywisty rozmiar tekstu
            const styles = getComputedStyle(textRef.current);
            const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
            const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

            setTextDimensions({
                width: rect.width + paddingX,
                height: rect.height + paddingY
            });

            const canvas = maskRef.current;
            canvas.width = (rect.width + paddingX) * dpr;
            canvas.height = (rect.height + paddingY) * dpr;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, rect.width + paddingX, rect.height + paddingY);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleBallPosition = (ballPos) => {
        if (!maskRef.current || !textRef.current) return;

        const canvas = maskRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const textRect = textRef.current.getBoundingClientRect();

        const isMobile = window.innerWidth <= 768;
        const mobileUIHeight = isMobile ? window.visualViewport.height - window.innerHeight : 0;

        // Dodajemy scroll position do obliczeń
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Obliczamy pozycję piłki względem elementu, uwzględniając przewijanie
        const x = ballPos.x - textRect.left - scrollX;
        const y = ballPos.y - textRect.top - scrollY - mobileUIHeight;

        const dynamicRadius = ballPos.radius * (isMobile ? 2 : 2);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, dynamicRadius);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, dynamicRadius, 0, Math.PI * 2);
        ctx.fill();

        const fillLayer = textRef.current.querySelector('.text-fill');
        if (fillLayer) {
            fillLayer.style.webkitMaskImage = `url(${canvas.toDataURL()})`;
            fillLayer.style.maskImage = `url(${canvas.toDataURL()})`;
        }
    };

    return (
        <section id="about" className="relative min-h-[100dvh] flex items-center justify-center">
            <div className="absolute inset-0">
                <PongBackground onBallPositionChange={handleBallPosition} />
            </div>

            <div className="relative  container mx-auto px-6 text-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative inline-block">
                        {/* Warstwa z outline */}
                        <h1
                            ref={textRef}
                            className="text-6xl lg:text-7xl font-bold relative pb-4 lg:pb-6"
                            style={{
                                WebkitTextStroke: '1px white',
                                WebkitTextFillColor: 'transparent'
                                ,
                            }}
                        >
                            Full Stack & Mobile Developer
                            {/* Warstwa z wypełnieniem */}
                            <span
                                className="text-fill absolute inset-0 text-6xl lg:text-7xl font-bold"
                                style={{
                                    color: 'white',
                                    WebkitTextStroke: '0',
                                    WebkitTextFillColor: 'white',
                                }}
                            >
                                Full Stack & Mobile Developer
                            </span>
                        </h1>
                        <canvas
                            ref={maskRef}
                            width={textDimensions.width}
                            height={textDimensions.height}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                pointerEvents: 'none',
                                opacity: 0,
                            }}
                        />
                    </div>
                    <TextWithGradients />


                    <div className="flex justify-center space-x-6">
                        <a href="https://github.com/jkotania" target="_blank" rel="noopener noreferrer"
                           className="text-mono-secondary hover:text-mono-primary transition-colors text-2xl">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/jan-kotania/" target="_blank" rel="noopener noreferrer"
                           className="text-mono-secondary hover:text-mono-primary transition-colors text-2xl">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:jkotania14@gmail.com"
                           className="text-mono-secondary hover:text-mono-primary transition-colors text-2xl">
                            <FaEnvelope />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}