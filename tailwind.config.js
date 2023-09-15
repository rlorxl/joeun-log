/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'base-color': '#535B77',
        'second-color': '#9199B5',
      },
      keyframes: {
        show: {
          '0%': { transform: 'translate(0,30px)', opacity: '0%' },
          '50%': { transform: 'translate(0,0)' },
          '100%': { opacity: '100%' },
        },
        moveright: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(5px)' },
        },
        lighton: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        show1: 'show 0.5s ease forwards',
        show2: 'show 1s ease forwards',
        show3: 'show 1.5s ease forwards',
        show4: 'show 2s ease forwards',
        show5: 'show 2.5s ease forwards',
        moveright: 'moveright 0.5s forwards',
        lighton: 'lighton 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: ['tailwind-scrollbar-hide'],
};
