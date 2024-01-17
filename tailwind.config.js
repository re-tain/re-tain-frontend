/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      colors: {
        'brand': '#F0FF42',
        'brandx': '#EDEDF0',
             black: colors.black,
        white: colors.white,
        grey: colors.trueGray,
        indigo: colors.indigo,
        green: colors.green,
        red: colors.rose,
        yellow: colors.amber,
      },
    extend: {},
    // ... darkMode: 'class',
  },
  plugins: [
    // ... 
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}