import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'folio': ['var(--font-folio)', 'sans-serif'],
        'fg': ['var(--franklin-gothic)', 'sans-serif'],
        'fg-atf': ['var(--franklin-gothic-atf)', 'sans-serif'],
      },
      colors: {
        'white': '#FFFFFF',
        'gray': '#ADAFA8',
        'blue': '#2550A8',
        'teal': '#2E636D',
        'green': '#02816C',
        'gold': '#B77F3B',
        'orange-red': '#CF4D26',
        'brown': '#724026',
        'black': '#0D0D0D'
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
