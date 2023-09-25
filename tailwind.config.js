const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'base-color': '#535B77',
        'second-color': '#9199B5',
        'darkmode-base-color': '#282930',
        'darkmode-text-color': '#CBCFDC',
      },
      keyframes: {
        show: {
          '0%': { transform: 'translate(0,30px)', opacity: '0%' },
          '50%': { transform: 'translate(0,0)' },
          '100%': { opacity: '100%' },
        },
        moveright: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(5px)' },
        },
        drawline: {
          '0%': { width: '0%' },
          '100%': { width: '50%' },
        },
        lighton: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        darkmode: {
          '0%': { transform: 'translate(40px,-12px)' },
          '100%': { transform: 'translate(0px,-12px)' },
        },
        lightmode: {
          '0%': { transform: 'translate(-40px,-12px)' },
          '100%': { transform: 'translate(-80px,-12px)' },
        },
      },
      animation: {
        show1: 'show 0.5s ease forwards',
        show2: 'show 1s ease forwards',
        show3: 'show 1.5s ease forwards',
        show4: 'show 2s ease forwards',
        show5: 'show 2.5s ease forwards',
        moveright: 'moveright 0.5s forwards',
        drawline: 'drawline 0.4s forwards',
        lighton: 'lighton 0.5s ease-in-out forwards',
        todarkmode: 'darkmode 0.7s ease-in-out forwards',
        tolightmode: 'lightmode 0.7s ease-in-out forwards',
      },
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: ['tailwind-scrollbar-hide'],
};
