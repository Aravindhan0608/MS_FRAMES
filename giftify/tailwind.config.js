/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',
        gold: '#C89B3C',
        goldLight: '#D8B56A',
        cream: '#FAF6EE',
        offwhite: '#F8F6F2',
        bodyText: '#4B4B4B',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        body: ['Poppins', 'sans-serif'],
        button: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 8px 26px rgba(11, 11, 11, 0.08)',
        lift: '0 20px 48px rgba(11, 11, 11, 0.18)',
        gold: '0 10px 30px rgba(200, 155, 60, 0.35)',
        inner_gold: 'inset 0 0 0 1px rgba(200, 155, 60, 0.35)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D8B56A, #C89B3C)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease forwards',
      },
    },
  },
  plugins: [],
};
