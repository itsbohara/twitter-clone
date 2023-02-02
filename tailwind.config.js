/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-mona-sans)", ...fontFamily.sans],
        sans: ["var(--font-mona-sans)", ...fontFamily.sans],
      },
      keyframes: {
        splash: {
          "0%": {
            opacity: 0.4,
          },
          "50%": {
            opacity: 0.7,
          },
          "100%": {
            opacity: 0.5,
          },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
