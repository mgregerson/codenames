/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: {
        light: "#85d7ff",
        DEFAULT: "#1fb6ff",
        dark: "#3284A3",
      },
      red: {
        light: "#ff7ce5",
        DEFAULT: "#ff49db",
        dark: "#8F2B1C",
      },
      background: "#8F2B1C",
    },
    extend: {},
  },
  plugins: [],
};
