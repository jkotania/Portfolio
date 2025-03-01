// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Schemat 1: Minimalistyczny monochromatyczny
        mono: {
          primary: '#E2E2E2',
          secondary: '#CCCCCC',
          accent: '#404040',
          background: '#0F0F0F',
        },
      }
    },
  },
  plugins: [],
}