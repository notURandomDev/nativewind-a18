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
      },
      fontFamily: {
        pf: ['PingFang', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
