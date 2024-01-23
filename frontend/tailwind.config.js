/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'dark-starry-sky': "url('/Assets/Images/kai-pilger.jpg')",
      }
    },
  },
  plugins: [],
}

