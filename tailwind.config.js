/** @type {import('tailwindcss').Config} */
import * as colors from 'tailwindcss/colors'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './formkit.config.js',
    './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.indigo,
        "vtd-secondary": colors.gray
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

