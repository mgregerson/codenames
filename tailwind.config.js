/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

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
      brown: "#EED5B2",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [],
};
