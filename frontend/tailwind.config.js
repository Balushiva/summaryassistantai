module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          600: '#16a34a',
          700: '#15803d',
        }
      }
    },
  },
  plugins: [],
}

