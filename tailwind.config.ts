import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      screens: {
        xs: "320px",
        s: "640px",
        m: "768px",
        l: "1024px",
        xl: "1280px",
      },
      colors: {
        sageGreen: "#8BAA87",
        customBlack:"#2D2D2D",
        grey:"#6B6B6B",
        primaryHover: "#7F9F7B",
        gold: "#D6B26A",
        softstone: "#F7F5F2",
        charcoal: "#2B2B2B",
        slate: "#6C6C6C",
        border: "#E5E7EB",
        cardBorder: "#F3F4F6",
        paper: "#FFFFFF",
        sage: "#8B7EC8",
        trendBg: "#DCFCE7",
        trendGreen: "#008236",
        authBg: "#F7F4EE",
      },
      borderRadius: {
        card: "14px",
        button: "10px",
        pill: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        arial: ["Arial", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.3" }],
        s: ["14px", { lineHeight: "1.3" }],
        m: ["16px", { lineHeight: "1.4" }],
        l: ["20px", { lineHeight: "1.5" }],
        xl: ["32px", { lineHeight: "1.2" }],
        xxl: ["30px", { lineHeight: "1.2" }],
        xxxl: ["40px", { lineHeight: "1.2" }],
      },
    },
  },
};

export default config;
