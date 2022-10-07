/* eslint-disable @typescript-eslint/no-var-requires */
const Nth = require('tailwind-nth-child')
const nthn1 = new Nth('n1', 'n+1')
const nthn2 = new Nth('n2', 'n+2')
const nthn3 = new Nth('n3', 'n+3')
const nthn4 = new Nth('n4', 'n+4')
const nthn5 = new Nth('n5', 'n+5')
const nthn6 = new Nth('n6', 'n+6')

module.exports = {
  content: [
    './pages/**/*.tsx',
    './partials/**/*.tsx',
    './components/**/*.tsx',
    './slices/**/*.tsx'
  ],
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      sans: 'Exo, Vazirmatn, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif:
        'Exo, Vazirmatn, "Libre Baskerville", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
    },
    extend: {
      colors: {
        text: 'rgb(17, 24, 39)',
        primary: '#04005c'
      }
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    nthn1.nthChild(),
    nthn2.nthChild(),
    nthn3.nthChild(),
    nthn4.nthChild(),
    nthn5.nthChild(),
    nthn6.nthChild()
  ]
}
