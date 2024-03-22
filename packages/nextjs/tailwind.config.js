module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6CBF8C", // Adjusted primary color to green
          "primary-content": "#487d6e",
          secondary: "#b6dec1",
          "secondary-content": "#487d6e",
          accent: "#6CBF8C", // Adjusted accent color to green
          "accent-content": "#487d6e",
          neutral: "#487d6e",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#b6dec1",
          "base-content": "#487d6e",
          info: "#6CBF8C", // Adjusted info color to green
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: "#6CBF8C", // Adjusted primary color to green
          "primary-content": "#F9FBFF",
          secondary: "#316132",
          "secondary-content": "#F9FBFF",
          accent: "#8FD39E", // Adjusted accent color to a lighter shade of green
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#388037",
          "base-100": "#388037",
          "base-200": "#2d4731",
          "base-300": "#487d6e",
          "base-content": "#F9FBFF",
          info: "#388037",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
