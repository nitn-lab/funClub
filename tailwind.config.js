

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "xxs" : {"max" : "420px"},
      "xs" : {"max" : "560px"},
      "sm" : { "max" : "768px"},
      "md" : { "max" : "976px"},
      "lg" : {"max" : "1440px"},
      "xl" : {"max" : "1536px"}
    },
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}
