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
        // Schemat 2: Zielono-szary
        nature: {
          primary: '#A0C49D',
          secondary: '#C4D7B2',
          accent: '#E1ECC8',
          background: '#1A1A1A',
        },
        // Schemat 3: Ciepły, złoto-brązowy
        warm: {
          primary: '#FFB000',
          secondary: '#E6B325',
          accent: '#CE9F35',
          background: '#1A1812',
        },
        // Schemat 4: Cyberpunk
        cyber: {
          primary: '#FF2E63',
          secondary: '#252A34',
          accent: '#08D9D6',
          background: '#0A0A0B',
        },
        // Schemat 5: Pastelowy
        pastel: {
          primary: '#F8B195',
          secondary: '#F67280',
          accent: '#C06C84',
          background: '#1D1D1D',
        }
      }
    },
  },
  plugins: [],
}