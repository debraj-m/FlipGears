/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      keyframes: {

        "slide": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },

        "to-fro":{
          "0%":{ transform:"translate(0%,0%)",transform: "rotate(-14deg)" },
          "100%":{ transform:"translate(0%,150%)", },
        },
        "zoom-out": {
          "0%": { transform: "scale(.95)" },
          "100%": { transform: "scale(1)" },
        },
        "fadeIn": {
          "0%": { opacity: 0, transform: "rotateY(90deg)", filter: "blur(10px)" },
          "100%": { opacity: 1, transform: "rotateY(0deg)", filter: "blur(0px)" },
        },
      },
      animation: {
        "zoom-out": "zoom-out .3s ease-in-out",
        "to-fro": "to-fro 7s ease-in-out infinite alternate",
        "slide": "slide 25s linear infinite",
        "fadeIn": "fadeIn 3s linear forwards",
      },
    },
  },
  plugins: [],
}

