const { fontFamily, screens } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const toScreens = Object
  .fromEntries(
    Object
      .entries(screens)
      .map(([screen, size]) => [
        `to-${screen}`,
        { max: `${parseInt(size, 10) - 1}px` },
      ]),
  );

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    screens: {
      ...toScreens,
      ...screens,
    },
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
