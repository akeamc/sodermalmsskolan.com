const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        gray: colors.trueGray,
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
