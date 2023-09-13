/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'base-color': '#535B77',
        'second-color': '#9199B5',
      },
    },
  },
  plugins: ['tailwind-scrollbar-hide'],
};
