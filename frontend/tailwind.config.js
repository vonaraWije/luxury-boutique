/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ee',
          100: '#f8edcc',
          200: '#f1d98a',
          300: '#e8c04a',
          400: '#d4a840',
          500: '#c9a96e',
          600: '#b8924a',
          700: '#9a7538',
          800: '#7d5e2e',
          900: '#604825',
        },
        champagne: '#f2e6d0',
        cream:     '#faf8f5',
        charcoal:  '#2d2d2d',
        'rose-gold': '#c49a9a',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"Cormorant Garamond"', '"Lato"', 'sans-serif'],
        body:   ['"Lato"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a96e 0%, #e8c04a 50%, #c9a96e 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-in-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
