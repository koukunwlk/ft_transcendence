/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'dark-starry-sky': "url('/assets/dark-starry-sky.jpg')",
      }
    },
  },
  plugins: [],
}

