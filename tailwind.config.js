/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: '#000000',
        ocean: '#4A70A9',
        mist: '#8FABD4',
        sand: '#EFECE3',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 16px 40px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #000000, #000000, #000000)',
        'gradient-overlay': 'radial-gradient(circle at top, rgba(74, 112, 169, 0.25) 0%, rgba(0, 0, 0, 0) 60%)',
        'gradient-progress': 'linear-gradient(to right, #4A70A9, #8FABD4)',
        'gradient-to-br': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'radial-to-br': 'radial-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
