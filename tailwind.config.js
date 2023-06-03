/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#151515",
      },
    },
    fontFamily: {
      sans: ["Nunito Sans", "Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
