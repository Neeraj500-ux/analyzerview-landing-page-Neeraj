/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: { 900: '#0a1330', 800: '#101c44', 700: '#16255a' },
        brand: { DEFAULT: '#1b5cf0', dark: '#0f3fb8', light: '#e8f0ff' },
      },
    },
  },
  plugins: [],
}
