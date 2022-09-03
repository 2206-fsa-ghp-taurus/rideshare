/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'spanish-gray': '#A39594',
      'kelly-green': '#5DB93C',
      'sheen-green': '#8CD846',
    },
    fontFamily: {
      lobster: ['Lobster', 'sans-serif'],
    },
    height: {
      '31px': '31px',
    },
    width: {
      '31px': '31px',
    },
  },
  plugins: [require('daisyui')],
};
