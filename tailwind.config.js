/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./auth/**/*.{html,js}",
    "./post/**/*.{html,js}",
    "./profile/**/*.{html,js}",
    "./src/**/*.{js,jsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
