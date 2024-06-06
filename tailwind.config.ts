import type { Config } from 'tailwindcss'

export default {
  // important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-animated')]
} satisfies Config
