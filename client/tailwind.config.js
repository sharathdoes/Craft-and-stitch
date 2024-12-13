/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],

        fontFamily: '"Public Sans", sans-serif',
   
    theme: {
      extend: {
        colors: {
          main: '#FFFFFF',
          mainAccent: '#9e66ff', // not needed for shadcn components
          overlay: 'rgba(0,0,0,0.8)', // background color overlay for alert dialogs, modals, etc.
    
          // light mode
          bg: '#FEF2E8',
          text: '#000000',
          border: '#000',
    
          // dark mode
          darkBg: '#374151',
          darkText: '#eeefe9',
          darkBorder: '#000',
          secondaryBlack: '#212121', // opposite of plain white, not used pitch black because borders and box-shadows are that color 
        },
        borderRadius: {
          base: '5px'
        },
        boxShadow: {
          light: '2px 2px 0px 0px #000',
          dark: '2px 2px 0px 0px #000',
        },
        translate: {
          boxShadowX: '5px',
          boxShadowY: '3px',
          reverseBoxShadowX: '-5px',
          reverseBoxShadowY: '-3px',
        },
        fontWeight: {
          base: '500',
          heading: '700',
        },
      },
    },
  plugins: [require("tailwindcss-animate")],
}
