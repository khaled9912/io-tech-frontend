/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./globals.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B2615",
        dark: "#1E1E1E",
        white: "#FFFFFF",
        muted: "#15143966",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
