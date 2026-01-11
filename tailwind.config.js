/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: '#001b31',
        lightColor: '#eed9a4',
        gray: '#e5e5e3',
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
