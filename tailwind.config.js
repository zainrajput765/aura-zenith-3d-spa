/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          bg: '#090D10',
          card: '#12181F',
          cardBorder: '#232E3A',
          gold: '#D4AF37',
          goldLight: '#F5E096',
          goldDark: '#997C22',
          emerald: '#10B981',
          emeraldDark: '#064E3B',
          pearl: '#F7F4EF',
          muted: '#8E9BAE',
          softBg: '#18202A',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        luxury: ['Cinzel', 'serif']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E096 0%, #D4AF37 50%, #997C22 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #047857 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
