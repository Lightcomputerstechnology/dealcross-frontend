module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e7f5ff',
          100: '#cae9ff',
          200: '#9bd1ff',
          300: '#5ab4ff',
          400: '#2699ff',
          500: '#007bff',
          600: '#0069e6',
          700: '#0052b3',
          800: '#003a80',
          900: '#00264d',
        },
        accent: {
          50: '#fff8e6',
          100: '#ffedc1',
          200: '#ffe096',
          300: '#ffd262',
          400: '#ffc73d',
          500: '#ffbb17',
          600: '#e6a603',
          700: '#b38302',
          800: '#806001',
          900: '#4d3a00',
        },
        surface: '#0f172a',
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 1s ease-out',
        slideInFromLeft: 'slideInFromLeft 1s ease-out',
        fadeIn: 'fadeIn 2s ease-in-out',
      },
    },
  },
  plugins: [],
};
