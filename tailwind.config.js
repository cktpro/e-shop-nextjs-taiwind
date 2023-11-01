/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "banner-1": "url('/assets/images/banner/banner1.jpg')",
      },
      colors: {
        error: {
          100: "#FFF1F2",
        },
        text: {
          1: "#FAFAFA",
          2: "#000000",
        },
        primary: {
          1: "#FFFFFF",
        },
        secondary: {
          1: "#F5F5F5",
          2: "#DB4444",
        },
        button: {
          1: "#F5F5F5",
          2: "#DB4444",
          3: "#00FF66",
        },
      },
      fontFamily: {
        poppins: "poppins",
        inter: "inter",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
        },
        center: true,
        screens: {
          DEFAULT: "75.125rem",
          // sm: "41.5rem",
          // md: "51.5rem",
          // lg: "61.5rem",
          // xl: "71.5rem",
          // "2xl": "75.125rem",
        },
      },
      boxShadow: {
        custom: "0px 1px 13px 0px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
