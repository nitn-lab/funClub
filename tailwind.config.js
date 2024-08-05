

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      "xxs" : {"max" : "420px"},
      "xs" : {"max" : "560px"},
      "sm" : { "max" : "768px"},
      "md" : { "max" : "976px"},
      "lg" : {"max" : "1200px"},
      "xl" : {"max" : "1536px"}
    },
    extend: {
      backgroundImage : {
        'main-gradient' : 'var(--main-gradient )'
      },
      colors:{
        primary:{
          light: '#000000',
          dark : '#ffffff'
        }
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}
