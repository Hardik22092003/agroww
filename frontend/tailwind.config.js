/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // existing (frontend/src)
    "../backend/**/*.js" // if any templates or JSX-in-JS (optional)
  ],
  theme: {
    extend: {
        colors: {
        primary: '#5E81F4',      // bluish violet
    secondary: '#6EE7B7',    // green accent
    dark: '#0F172A',         // dark background
    light: '#F8FAFC',        // light background
    accent: '#A78BFA',       // soft purple
      },
    },
  },
  plugins: [],
};

