/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#5C50BB',
    'primary-lighten-1': '#EFEDFD',
    secondary: '#03DAC6',
    grey: '#F7F7F7'
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  ssr: true,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
      // light: {
      //   colors: {
      //     primary: '#1867C0',
      //     secondary: '#5CBBF6',

      //   },
      // },
    },
  },
})
