/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        themeColor: "#F5821F",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      screens: {
        "max-md": { max: "1024px" },
        "max-tab": { max: "768px" },
        "max-mob": { max: "700px" },
        "max-mob1": { max: "485px" },
        "max-mob2": { max: "425px" },
        
        "max-mob3": { max: "375px" },
        "mob": { max: "394px" },
        "max-mob4": { max: "320px" },

        
        "mob-x": { raw: "(min-width: 360px) and (min-height: 800px)" },
        "mob-x2": { raw: "(min-width: 360px) and (min-height: 600px)" },

        "desk-mob": { raw: "(min-width: 820px) and (min-height: 950px)" },


        "des24": { raw: "(min-width: 1024px) and (min-height: 600px)" },

        "tab3": { raw: "(min-width: 768px) and (min-height: 1024px)" },
        "tab2": { raw: "(min-width: 820px) and (min-height: 1180px)" },
        "tab1": { raw: "(min-width: 1024px) and (min-height: 1366px)" },
        "mobl": { raw: "(min-width: 900px) and (min-height: 1700px)" },
        "moblg": { raw: "(min-width: 900px) and (min-height: 1910px)" },
  

        "max-lg": { min: "1440px" },
        "md-lap": { min: "1100px" },
        "lb80": { raw: "(min-width: 1280px) and (min-height: 800px)" },
        
        "larg": { raw: "(min-width: 1660px) and (min-height: 918px)" },
        "larg2": { raw: "(min-width: 1912px) and (min-height: 918px)" },
      },
    },
    animation: {
      "spin-slow": "spin 10s linear infinite",
    },
  },
  darkMode: "class",
  plugins: [],
};

export default tailwindConfig;
