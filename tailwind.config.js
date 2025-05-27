/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        background: "#f7f9f5",
        text: "#2e2e2e",
        primary: "#228B22",     // Forest green
        secondary: "#F4A300",   // Crop yellow
        investor: "#0077b6",    // Deep blue
        soil: "#8B4513",        // Soil brown
      },
    },
  },
  plugins: [],
};

