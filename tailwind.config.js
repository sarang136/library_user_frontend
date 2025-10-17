/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        // Optional: you can add custom colors if needed
        primary: "#0079f2",
        secondary: "#1da1f2",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};
