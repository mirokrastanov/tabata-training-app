/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-mq-500': '500px',
        'custom-mq-300': '300px',
      },
    },
  },
  plugins: [],
}

