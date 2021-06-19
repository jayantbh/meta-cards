const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        fit: "fit-content",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        rose: colors.rose,
        yellow: colors.amber,
        fuchsia: colors.fuchsia,
        teal: colors.teal,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      display: ["empty"],
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    plugin(function ({ addVariant, e }) {
      addVariant("empty", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`empty${separator}${className}`)}:empty`;
        });
      });
    }),
  ],
};
