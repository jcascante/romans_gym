/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D7262B', // Red from logo
        secondary: '#FFFFFF', // White
        accent: '#232323', // Black/gray for accents
      },
    },
  },
  plugins: [],
}

