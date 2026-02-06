import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: "#FFC72C",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(255, 199, 44, 0.35)",
      },
      animation: {
        'in': 'in 0.3s ease-out',
      },
      keyframes: {
        'in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
