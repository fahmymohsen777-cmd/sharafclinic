/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.tsx",
    "./*.ts",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          DEFAULT: '#8B0000',
          light: '#c0392b',
          dark: '#5a0000',
          glow: '#ff000033',
        },
        surface: {
          DEFAULT: '#141414',
          card: '#1a1a1a',
          hover: '#222222',
        },
        ash: '#0a0a0a',
        smoke: '#2d2d2d',
        ember: '#ff4500',
      },
      fontFamily: {
        arabic: ['Cairo', 'Amiri', 'serif'],
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'flicker': 'flicker 3s infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(0.8)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.4' },
        },
      },
      backgroundImage: {
        'radial-blood': 'radial-gradient(ellipse at center, #3d000044 0%, transparent 70%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
