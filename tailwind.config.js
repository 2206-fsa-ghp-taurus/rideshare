/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        Onyx: '#313638',
        'Spanish Gray': '#A39594',
        'Kelly Green': '#5DB93C',
        'Sheen Green': '#8CD846',
        Almond: '#ECE0D5',
      },
    },
  },
  plugins: [require('daisyui')],
};
