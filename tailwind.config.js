import colors from "tailwindcss/colors";
import { createThemes } from "tw-colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      dark: {
        primary: colors.zinc[800],
        secondary: colors.blue[500],
        tertiary: colors.slate[500],
        error: colors.red[500],
      },
      light: {
        primary: colors.white,
        secondary: colors.black,
        tertiary: colors.slate[500],
        error: colors.red[500],
      },
      terminal: {
        primary: colors.black,
        secondary: "#4AF626",
        tertiary: colors.slate[500],
        error: colors.red[500],
      },
    }),
  ],
};
