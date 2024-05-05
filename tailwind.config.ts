import type { Config } from "tailwindcss"

import tailwindAnimate from "tailwindcss-animate"
import tailwindReactAria from "tailwindcss-react-aria-components"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        danger: "hsl(var(--danger))",
      },
    },
  },
  plugins: [tailwindAnimate, tailwindReactAria()],
}
export default config
