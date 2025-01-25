/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient-right-top': 'linear-gradient(to right top, #ff7f50, #c1862e, #868430, #567941, #356950, #396e64, #497173, #5d747a, #829199, #a8afb6, #cdced3, #f0f0f0)',
      },
    },
  },
  plugins: [],
}
