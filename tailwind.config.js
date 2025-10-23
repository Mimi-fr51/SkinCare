/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-soft': 'float-soft 4s ease-in-out infinite',
      },
      colors: {
        'beige': {
          50: '#fefaf6',
          100: '#fdf6f0',
          200: '#fae8d8',
          300: '#f5d9c0',
          400: '#ecc39a',
          500: '#e0ac74',
          600: '#d1945a',
          700: '#b87746',
          800: '#945c3a',
          900: '#784b32',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}