import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d12",
        card: "#12151c",
        muted: "#9aa3b2",
        text: "#e8edf5",
        brand: "#ffd166",
        brand2: "#06d6a0",
        brand3: "#118ab2"
      },
      boxShadow: { soft: "0 6px 30px rgba(0,0,0,0.25)" },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
}
export default config
