import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: "#FF0000",
        "brand-foreground": "#000000",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
};

export default config;
