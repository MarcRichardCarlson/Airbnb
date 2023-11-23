module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
],
  
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },

      height: {
				"10v": "10vh",
				"20v": "20vh",
				"30v": "30vh",
				"40v": "40vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
				"90v": "90vh",
				"100v": "100vh",
			},

      colors: {
        'rich-blue': '#374151',
        'off-blue': '#445063',
        'rich-green': '#336659',
        'off-green': '#1f493d',
        'DEDE': '#DEDEDE',
        'default-orange': '#ff9c38',
        'off-orange': '#e38a31',
        'default-white': '#fff',
        'off-white': '#f1f1f1',
        'modal-background': '#000000B3',
        'default-grey': '#333',
        'off-grey': '#4f4f4f',
        'light-grey': '#D9D9D9',
        'darker-light-grey': '#7D7D7D',
        'default-red': '#FF000E',
        'off-red': '#9A0000',
      }
    },
  },
  plugins: [],
};
