/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#1278AE',
        'secondary': '#70C8F6',
        'tanah': {
          100: '#48D0D8',
          200: '#00565C',
        },
        'bangunan': {
          300: '#0066FF',
          400: '#0E26B0',
        },
        'kendaraan': {
          500: '#E60808',
          600: '#FFC2C2',
        },
        'mesin': {
          700: '#DDD400',
          800: '#FFFB9C',
        },
        white: {
          0: '#FFFFFF',
          10: '#FBFBFB'
        },
        black: {
          50: '#9A9A9A'
        },
        green: {
          50: '#4C9A2A'
        },
        orange: {
          50: '#FF7A1D'
        },
        gray: {
          50: '#C9C9C9'
        }
      },
      size: {
        h1: {
          fontSize: '32px',
          fontWeight: 'bold',
        }
      }
    },
  },
  plugins: [],
}
