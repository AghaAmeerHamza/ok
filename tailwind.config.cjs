/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f0c',
        moss: '#0f1a12',
        acid: '#b6ff45',
        fern: '#3d5f3c',
        fog: '#d9f6c3',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(182, 255, 69, 0.25)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(182,255,69,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(182,255,69,0.07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
