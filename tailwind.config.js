/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-w-540': {'max': '540px'},
        'max-w-768': {'max': '768px'},
        'max-w-713': {'max': '713px'},
        'max-w-420': {'max': '420px'},
        'max-w-1000': {'max': '1000px'},
      },
    },
  },
  plugins: [],
}

