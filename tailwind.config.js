/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        pitch: {
          lighter: "#2f8a61",
          light: "#1a5a41",
          DEFAULT: "#123524",
        },
        gold: {
          light: "#f4d47c",
          DEFAULT: "#e3b23c",
        },
        turf: "#2f8a61",
        bone: "#f7efe4",
        ink: "#060e0b",
        flame: "#ff4d4f",
      },
      fontFamily: {
        display: ["system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        display: "24px",
      },
    },
  },
};
