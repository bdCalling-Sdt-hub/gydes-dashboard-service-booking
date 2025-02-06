/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#FFFFFF",
        "secondary-color": "#0861C5",
        "base-color": "#000000",
        "highlight-color": "#C0C0C0",
        "input-color": "#000000",
      },
    },
  },
  plugins: [],
};
