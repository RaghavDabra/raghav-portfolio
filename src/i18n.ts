import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    supportedLngs: ['en'],
    fallbackLng: ['en'],
    load: 'languageOnly',
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: ['localStorage', 'sessionStorage']
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    returnObjects: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })

export default i18n
