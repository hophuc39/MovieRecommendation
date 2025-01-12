/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tmdbDarkBlue: '#032541',
        tmdbLightBlue: '#01b4e4',
        tmdbLightGreen: '#90cea1',
        tmdbDarkGreen: '#21d07a'
      },
      maxWidth: {
        '8xl': '1400px'
      },
      utilities: {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
}
