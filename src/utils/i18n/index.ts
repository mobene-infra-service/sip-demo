import i18n from 'i18next'
import en from './en.json'
import es from './es.json'

import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: en,
  },

  es: {
    translation: es,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
