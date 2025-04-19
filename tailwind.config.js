
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00a3ff',
        secondary: '#0057ff',
        dark: '#050b2e',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00a3ff, 0 0 10px #00a3ff, 0 0 15px #0057ff' },
          '100%': { boxShadow: '0 0 10px #00a3ff, 0 0 20px #00a3ff, 0 0 30px #0057ff' },
        },
      },
    },
  },
  plugins: [],
}
