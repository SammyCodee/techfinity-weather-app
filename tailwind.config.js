/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryPurple: "rgba(26, 26, 26, 0.5)",
        secondaryPurple: "rgba(26, 26, 26, 0.3)",
        tertiaryPurple: "rgba(49, 41, 91, 0.6)",
        customPurple: "rgb(37, 33, 57)",
        customGray: "rgb(110, 102, 128)",
        lightPrimaryPurple: "rgba(190, 170, 229, 1)",
        lightSecondaryPurple: "rgba(204, 185, 232, 0.8)",
        lightTertiaryPurple: "rgba(227, 217, 243, 0.8)",
        customLightPurple: "rgb(101, 60, 169)"
        // lightSecondaryPurple: "rgb(207, 193, 235)",
        
      },
      screens: {
        'sm': '511px',
        'max-300': {'max': '300px'},
        'max-510': {'max': '510px'} // Custom breakpoint for max-width 510px
      }
    },
  },
  plugins: [],
};
