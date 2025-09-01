/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bde3ff',
          300: '#90d0ff',
          400: '#5ab6ff',
          500: '#2a98f5',
          600: '#1e7ad1',
          700: '#1b64ac',
          800: '#1a528a',
          900: '#183f66',
        },
      },
    },
  },
  plugins: [],
}