/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      '2xl': '1900px',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
