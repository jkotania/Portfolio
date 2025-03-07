import { motion } from 'framer-motion';

const TypewriterWord = ({ word, startDelay = 0, charDelay = 0.03 }) => {
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
                        delay: startDelay + (index * charDelay),
                    }}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

const TypewriterText = ({ text, startDelay = 0, charDelay = 0.03 }) => {
    const words = text.split(' ');
    let currentDelay = startDelay;

    return (
        <span className="inline">
            {words.map((word, index) => {
                const wordDelay = currentDelay;
                // Add fixed word spacing for more consistent timing
                const wordAnimationTime = word.length * charDelay;
                // Always add a fixed delay between words to create a more natural rhythm
                currentDelay += wordAnimationTime + 0.1;
                return (
                    <TypewriterWord
                        key={index}
                        word={word}
                        startDelay={wordDelay}
                        charDelay={charDelay}
                    />
                );
            })}
        </span>
    );
};

const TextWithGradients = () => {
    // Polish text
    const firstPart = "Tworzę nowoczesne aplikacje używając";
    const and = "oraz";
    const lastPart = ", wzbogacone o możliwości sztucznej inteligencji. Specjalizuję się w tworzeniu wydajnych rozwiązań cross-platformowych.";
    
    // Use a shorter character delay for smoother animation
    const charDelay = 0.025;
    
    // Calculate total animation time for the first part
    // Count total characters including spaces
    const totalChars = firstPart.replace(/ /g, '').length; // Count without spaces
    const wordCount = firstPart.split(' ').length;
    const firstPartDuration = (totalChars * charDelay) + (wordCount * 0.1);
    
    // Define timing for subsequent elements
    const nextJsStartDelay = firstPartDuration + 0.2;
    const nextJsDuration = 0.3;
    const andStartDelay = nextJsStartDelay + nextJsDuration + 0.2;
    const flutterStartDelay = andStartDelay + (and.length * charDelay) + 0.3;
    const lastPartStartDelay = flutterStartDelay + 0.4;

    return (
        <p className="text-xl text-mono-secondary mb-8 max-w-2xl mx-auto">
            <TypewriterText
                text={firstPart}
                startDelay={0.2}
                charDelay={charDelay}
            />
            {' '}
            <motion.span
                className="inline-block text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: nextJsStartDelay,
                    duration: nextJsDuration
                }}
            >
                Next.js
            </motion.span>
            {' '}
            <TypewriterText
                text={and}
                startDelay={andStartDelay}
                charDelay={charDelay}
            />
            {' '}
            <motion.span
                className="inline-block text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#42A5F5] to-[#0D47A1] whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: flutterStartDelay,
                    duration: 0.3
                }}
            >
                Flutter
            </motion.span>
            {' '}
            <TypewriterText
                text={lastPart}
                startDelay={lastPartStartDelay}
                charDelay={charDelay}
            />
        </p>
    );
};

export default TextWithGradients;