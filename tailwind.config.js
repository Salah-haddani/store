/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        sidebarBg: "#E6F9F8",
        actionPrimary: "#00B4AE",
        actionSecondary: "#00C7C1",
        softGray1: "#F8F9FA",
        softGray2: "#E5E7EB",
        softGray3: "#b5b6ba",
        textDark: "#0F172A",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".h1": {
          fontSize: theme("fontSize.5xl"),
          fontWeight: theme("fontWeight.extrabold"),
          color: theme("colors.textDark"),
        },
        ".h2": {
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.bold"),
          color: theme("colors.textDark"),
        },
        ".h3": {
          fontSize: theme("fontSize.xl"),
          fontWeight: theme("fontWeight.semibold"),
          color: theme("colors.textDark"),
        },
        ".overline": {
          fontSize: theme("fontSize.xs"),
          textTransform: "uppercase",
          letterSpacing: theme("letterSpacing.wider"),
          fontWeight: theme("fontWeight.medium"),
          color: theme("colors.actionPrimary"),
        },
        ".caption": {
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.normal"),
          color: theme("colors.softGray3"),
        },

        ".btn-primary": {
          "@apply text-white rounded-lg transition-all": {},
          "background-image": `linear-gradient(to right, ${theme(
            "colors.actionPrimary"
          )} 0%, ${theme("colors.actionSecondary")} 100%)`,
          "&:hover": {
            opacity: 0.9,
          },
        },

        ".input-base": {
          "@apply border border-softGray2/60 rounded-lg py-2 px-3 focus:outline-none focus:border-actionPrimary focus:ring-0 text-textDark transition-colors":
            {},
        },

        ".card-base": {
          "@apply rounded-xl shadow-md hover:shadow-xl transition-all bg-white":
            {},
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
