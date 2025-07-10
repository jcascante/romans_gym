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
        primary: '#2563EB', // Nice blue (blue-600) - not too bright
        secondary: '#FFFFFF', // White
        accent: '#1E40AF', // Darker blue for accents (blue-700)
      },
    },
  },
  plugins: [],
}

