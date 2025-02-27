"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
        {
            title: "Mogo",
            description: "Website for a fictional furniture company with authentication system.",
            tech: ["Next.js", "Tailwind CSS", "Supabase", "Auth"],
            type: "Website",
            link: "https://mogo-ruby.vercel.app/",
            image: "/mogo-preview.png"
        },
        {
            title: "Kombuczara",
            description: "Website created to promote fermented tea in Poland by an influencer known as 'Kombuczara'.",
            tech: ["Zyro", "JavaScript","API","UX/UI", "Figma"],
            type: "Website",
            link: "https://kombuczara.com/",
            image: "/kombuczara-preview.png"
        },
        {
            title: "FoodAR",
            description: "Mobile application with object detection functionality. Uses YOLO AI model for object recognition and Firebase for data storage.",
            tech: ["Flutter", "Firebase", "YOLO AI", "TensorFlow Lite","Figma"],
            type: "Mobile App with AI",
            image: "/mobile-preview.png"
        },
        {
            title: "LogiX",
            description: "Platform for software development companies. Frontend built with Next.js using Tailwind CSS.",
            tech: ["Next.js", "Tailwind CSS"],
            type: "Website",
            link: "https://logix-gilt.vercel.app/",
            image: "/logix-preview.png"
        },
        {
            title: "Portfolio",
            description: "Exactly the same website you're on right now where you can learn more about me. :P",
            tech: ["Next.js", "Tailwind CSS"],
            type: "Website",
            image: "/portfolio-preview.png"
        },
        {
            title: "Radio Silesia",
            description: "A fully functional prototype created specifically for collaboration with Radio Silesia. Achieved the highest ratings in the competition.",
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
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.15
            }
        }
    };

    const projectVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.645, 0.045, 0.355, 1],
            }
        }
    };


    return (
        <section id="projects" className="py-20 snap-start snap-always flex items-center justify-center px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    Projects
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={projectVariants}
                            className="group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col h-full"
                        >
                            <motion.div
                                className="relative h-36 sm:h-40 overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </motion.div>

                            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <motion.h3
                                                className="text-lg sm:text-xl font-semibold mb-2"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <ColoredProjectTitle title={project.title} />
                                            </motion.h3>
                                            <motion.span
                                                className="inline-block px-2 py-1 text-sm rounded-full bg-white/10"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {project.type}
                                            </motion.span>
                                        </div>
                                    </div>

                                    <motion.p
                                        className="text-gray-400 text-sm sm:text-base mb-3"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {project.description}
                                    </motion.p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech, techIndex) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 + (techIndex * 0.1) }}
                                                className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {project.link && (
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        View Project
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
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
