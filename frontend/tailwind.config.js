/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('./src/assets/images/kai-pilger.jpg')",
      },
      colors: {
        'default-background': "#14141c",
      }
    },
  },
  plugins: [],
}
