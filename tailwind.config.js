/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'Spanish Gray': '#A39594',
        'Kelly Green': '#5DB93C',
        'Sheen Green': '#8CD846',
      },
      fontFamily: {
        lobster: ['Lobster', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
