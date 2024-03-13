/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('./src/Assets/Images/kai-pilger.jpg')",
      },
      colors: {
        'default-background': "#14141c",
      }
    },
  },
  plugins: [],
}

