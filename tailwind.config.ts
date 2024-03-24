import type { Config } from 'tailwindcss'

import { addDynamicIconSelectors } from '@iconify/tailwind'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors()],
}
export default config
