/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FAFAFA',
        green: '#1F5152',
        yellow: '#F5E9DB',
        orange: '#F6C17B',
      },
    },
  },
  plugins: [require('daisyui')],
};
