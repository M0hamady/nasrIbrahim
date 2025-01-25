module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#334B35', // Sidebar background
        secondary: '#C0C7C8', // Sidebar hover color
        accent: '#079211', // Bright green
        dark: '#2F2F2F', // Dark header background
        light: '#F5F5F5', // Main background
        highlight: '#DCECE4', // Soft highlight
      },
      fontFamily: {
        primary: ['Nico Moji', 'sans-serif'],
        secondary: ['Luckiest Guy', 'cursive'],
        pop: ['Poppins', 'cursive'],
        lora: ['Lora', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
