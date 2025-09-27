/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // مسیر فایل‌های React
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-motion')],
  fontFamily: {
    yekan: ['yekanBold', 'yekan'],
  },
};
