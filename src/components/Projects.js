"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Mogo",
        description: "Strona internetowa dla fikcyjnej firmy meblarskiej z systemem autentykacji.",
        tech: ["Next.js", "Tailwind CSS", "Supabase", "Auth"],
        type: "Strona internetowa",
        link: "https://mogo-ruby.vercel.app/",
        image: "/mogo-preview.png"
    },
    {
        title: "Kombuczara",
        description: "Strona internetowa stworzona w celu popularyzowania fermentowanej herbaty w Polsce przez influencerkę znaną jako 'Kombuczara'.",
        tech: ["Zyro", "JavaScript","API","UX/UI", "Figma"],
        type: "Strona internetowa",
        link: "https://kombuczara.com/",
        image: "/kombuczara-preview.png"
    },
    {
        title: "FoodAR",
        description: "Aplikacja mobilna z funkcją detekcji obiektów. Wykorzystuje model YOLO AI do rozpoznawania obiektów oraz Firebase do przechowywania danych.",
        tech: ["Flutter", "Firebase", "YOLO AI", "TensorFlow Lite","Figma"],
        type: "Aplikacja mobilna z AI",
        image: "/mobile-preview.png"
    },
    {
        title: "LogiX",
        description: "Platforma dla firm software development'owych. Frontend wykonany w Next.js z wykorzystaniem Tailwind CSS.",
        tech: ["Next.js", "Tailwind CSS"],
        type: "Strona internetowa",
        link: "https://logix-gilt.vercel.app/",
        image: "/logix-preview.png"
    },
    {
        title: "Portfolio",
        description: "Dokładnie ta sama strona na której teraz jesteś i na której możesz dowiedzieć się czegoś o mnie. :P",
        tech: ["Next.js", "Tailwind CSS"],
        type: "Strona internetowa",
        image: "/portfolio-preview.png"
    },
    {
        title: "Radio Silesia",
        description: "Stworzono w pełni funkcjonalny prototyp, specjalnie na potrzeby współpracy z Radiem Silesia. Osiągnął najlepsze notowania w konkursie.",
        tech: ["Figma", "UX/UI","Mobile"],
        type: "Design",
        image: "/radio-preview.png"
    }
];

const ColoredProjectTitle = ({ title }) => {
    const colorMapping = {
        "LogiX": (
            <span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8e8e8e] via-[#f0f0f0] to-[#8e8e8e] font-bold tracking-wide">
                    LogiX
                </span>
            </span>

        ),
        "Portfolio": (
            <span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8e8e8e] via-[#f0f0f0] to-[#8e8e8e] font-bold tracking-wide">
                    Portfolio
                </span>
            </span>

        ),
        "Mogo": (
            <span>
                M<span className="text-[rgb(18,88,255)]">og</span>o
            </span>
        ),
        "FoodAR": (
            <span>
                <span>Food</span>
                <span className="text-[#63D471]">AR</span>
            </span>
        ),
        "Kombuczara": (
            <span className="text-[#E9A85D]">Kombuczara</span>
        ),
        "Radio Silesia": (
            <span>
                <span className="text-blue-500">Radio</span>
                {" "}
                <span className="text-red-500">Silesia</span>
            </span>
        )
    };

    if (title === "Radio Silesia") {
        return (
            <span>
                <span>
                    <span className="text-blue-500">Radio</span>
                    {" "}
                    <span className="text-red-500">Silesia</span>
                </span>
            </span>
        );
    }

    return colorMapping[title] || <span>{title}</span>;
};

export default function Projects() {
    return (
        <section id="projects" className="py-20 snap-start snap-always flex items-center justify-center px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    Projekty
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col h-full"
                        >
                            <div className="relative h-36 sm:h-40 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-semibold mb-2">
                                                <ColoredProjectTitle title={project.title} />
                                            </h3>
                                            <span className="inline-block px-2 py-1 text-sm rounded-full bg-white/10">
                                                {project.type}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm sm:text-base mb-3">
                                        {project.description}
                                    </p>


                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Zobacz projekt
                                        <svg
                                            className="ml-2 w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}