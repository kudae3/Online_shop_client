/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/views/*.{vue,js,ts,jsx,tsx}",
    "./src/components/*.vue"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'dancing-srcipt': ["Dancing Script", "cursive"],
      'caveat': ["Caveat", "cursive"],
      'comfortaa': ["Comfortaa", "sans-serif"]
    }
  },
  plugins: [],
}

