/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#F97316",
          "secondary": "#d926a9",
          "accent": "#1fb2a6",
          "neutral": "#2a323c",
          "base-100": "#1d232a",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#FFBE00",
          "error": "#FF5861",
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/forms'),
  require('daisyui')],
}

