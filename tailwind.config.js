/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#FFFFFF',
        surface: '#F4F5F7',
        obsidian: '#050505',
        neutral: '#171717',
        cerulean: '#00B5E2',
        border: '#E5E7EB',
      },
      animation: {
        'typing': 'typeLoop 6s steps(21) infinite, blinkCursor 0.8s step-end infinite',
        'scrollUp': 'scrollUp 20s linear infinite',
        'scrollUpSlow': 'scrollUp 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'floatCircle': 'floatCircle 8s ease-in-out infinite',
        'floatTriangle': 'floatTriangle 10s ease-in-out infinite',
        'floatPlusGrid': 'floatPlusGrid 12s ease-in-out infinite',
      },
      keyframes: {
        typeLoop: {
          '0%': { width: '0' },
          '40%': { width: '21ch' },
          '60%': { width: '21ch' },
          '100%': { width: '0' },
        },
        blinkCursor: {
          '0%, 100%': { borderColor: '#00C2FF' },
          '50%': { borderColor: 'transparent' },
        },
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        floatCircle: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -15px) rotate(90deg)' },
          '50%': { transform: 'translate(0, -30px) rotate(180deg)' },
          '75%': { transform: 'translate(-10px, -15px) rotate(270deg)' },
        },
        floatTriangle: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-20px, 15px) rotate(120deg)' },
          '66%': { transform: 'translate(20px, -15px) rotate(240deg)' },
        },
        floatPlusGrid: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(10px, -10px) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
