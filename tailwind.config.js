/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html,js}",
    "./views/*.{ejs,html,js}",
    "./public/**/*.{ejs,html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}