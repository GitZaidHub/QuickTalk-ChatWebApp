/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensures Tailwind processes all your React components
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',  // Add Flowbite paths
  ],
  theme: {
    extend: {
      colors: {
        'scroll-thumb': '#4a90e2', // Custom thumb color
        'scroll-track': '#e2e8f0', // Custom track color
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwindcss-animate"),
  ],
}