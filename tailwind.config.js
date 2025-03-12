/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App/**/*.{js,ts,tsx,jsx}', './components/**/*.{js,ts,tsx,jsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#f2f2f2',
        secondary: '#111111',
        red: '#ff3f3f',
        blue: {
          DEFAULT: '#1556F0',
          faint: '#F5F8FF',
        },
        gray: {
          DEFAULT: '#E8E8E8',
          solid: '#8B8B8B',
          tertiary: '#D9D9D9',
          ghost: '#11111190',
        },
        yellow: '#ffca5f',
      },
      fontFamily: {
        pf: ['PingFang', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
