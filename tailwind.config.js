/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E0FFFF", // Light Cyan
          DEFAULT: "#00FFFF", // Cyan
          dark: "#008B8B", // Dark Cyan
        },
        secondary: {
          light: "#E0F2F1", // Light Teal
          DEFAULT: "#008080", // Teal
          dark: "#004D40", // Dark Teal
        },
      },
    },
  },
  plugins: [],
};
