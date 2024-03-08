/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`], // all .ejs file
    theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

