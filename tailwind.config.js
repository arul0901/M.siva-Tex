/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4D0007',
        maroon: {
          DEFAULT: '#4D0007',
          dark: '#360005',
          deep: '#2A0004',
          light: '#6B050E',
        },
        templeGold: {
          DEFAULT: '#D4AF37',
          bright: '#ECBA51',
          champagne: '#C7A36A',
          muted: '#B18A52',
          pale: '#F6E7B9',
        },
        logoBeige: {
          DEFAULT: '#F8F4ED',
          ivory: '#FAF7F2',
          white: '#FDFBF7',
          warm: '#F3ECE1',
        },
        burgundy: {
          DEFAULT: '#4D0007',
          dark: '#360005',
          light: '#612349',
          deep: '#2A0004'
        },
        wine: {
          DEFAULT: '#59203F',
          dark: '#40152C',
          light: '#722B52'
        },
        gold: {
          DEFAULT: '#B18A52',
          light: '#CDB185',
          dark: '#8C6834',
          muted: '#A07D49',
          pale: '#EBD8B8',
          stars: '#D4A853'
        },
        ivory: {
          DEFAULT: '#F8F4ED',
          light: '#FCFAF6',
          dark: '#EDE5D6'
        },
        beige: {
          DEFAULT: '#E9DFD0',
          light: '#F3ECE1',
          dark: '#D8C7B0'
        },
        brown: {
          deep: '#30221F',
          dark: '#241916',
          warm: '#4A3530'
        },
        rose: {
          muted: '#D9B7B1',
          pale: '#F1E4E1',
          dusty: '#C29891'
        }
      },
      fontFamily: {
        primary: ['var(--font-primary)', "'Bodoni Moda'", 'Georgia', 'serif'],
        secondary: ['var(--font-secondary)', 'Manrope', '-apple-system', 'sans-serif'],
        special: ['var(--font-special)', "'Instrument Serif'", 'Georgia', 'serif'],
        editorial: ['var(--font-special)', "'Instrument Serif'", 'Georgia', 'serif'],
        serif: ['var(--font-primary)', "'Bodoni Moda'", 'Georgia', 'serif'],
        display: ['var(--font-primary)', "'Bodoni Moda'", 'Georgia', 'serif'],
        sans: ['var(--font-secondary)', 'Manrope', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(48, 17, 36, 0.08), 0 0 1px 1px rgba(177, 138, 82, 0.15)',
        'luxury-hover': '0 30px 60px -12px rgba(48, 17, 36, 0.16), 0 0 1px 1px rgba(177, 138, 82, 0.3)',
        'gold-glow': '0 0 25px rgba(177, 138, 82, 0.35)',
      }
    },
  },
  plugins: [],
}
