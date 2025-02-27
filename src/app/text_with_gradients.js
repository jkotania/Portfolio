import { motion } from 'framer-motion';

const TypewriterWord = ({ word, startDelay = 0 }) => {
    return (
        <span className="inline-block whitespace-nowrap z-10"
              style={{ marginRight: '0.2em' }}>
            {word.split('').map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.05,
                        delay: startDelay + (index * 0.03),
                    }}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

const TypewriterText = ({ text, startDelay = 0 }) => {
    const words = text.split(' ');
    let currentDelay = startDelay;

    return (
        <span className="inline">
            {words.map((word, index) => {
                const wordDelay = currentDelay;
                currentDelay += word.length * 0.03;
                return (
                    <TypewriterWord
                        key={index}
                        word={word}
                        startDelay={wordDelay}
                    />
                );
            })}
        </span>
    );
};

const TextWithGradients = () => {
    const firstPart = "I create modern applications using";
    const firstPartDuration = firstPart.length * 0.03;

    return (
        <p className="text-xl text-mono-secondary mb-8 max-w-2xl mx-auto">
            <TypewriterText
                text={firstPart}
                startDelay={0.2}
            />
            {' '}
            <motion.span
                className="inline-block text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: firstPartDuration + 0.2,
                    duration: 0.3
                }}
            >
                Next.js
            </motion.span>
            {' '}
            <TypewriterText
                text="and"
                startDelay={firstPartDuration + 0.7}
            />
            {' '}
            <motion.span
                className="inline-block text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#42A5F5] to-[#0D47A1] whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: firstPartDuration + 0.9,
                    duration: 0.3
                }}
            >
                Flutter
            </motion.span>

            <TypewriterText
                text=", enhanced with artificial intelligence capabilities. I specialize in creating efficient cross-platform solutions."
                startDelay={firstPartDuration + 1.4}
            />
        </p>
    );
};

export default TextWithGradients;