import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { isProduction } from '@newtash/react-app-core';

const loadPath = '/locales/{{lng}}/{{ns}}.json';
const addPath = `${process.env.REACT_APP_I18N_URL}/{{lng}}`;
const saveMissing = process.env.REACT_APP_I18N_SAVE_MISSING === true;

const whitelist = process.env.REACT_APP_I18N_LANGUAGES.split('|');
const fallbackLng = process.env.REACT_APP_I18N_FALLBACK_LNG;

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath,
      addPath,
      // allow cross domain requests
      crossDomain: true,
    },
    // Save missings
    saveMissing,
    saveMissingTo: 'current',

    load: 'languageOnly', // currentOnly|languageOnly|all
    whitelist,
    fallbackLng,

    ns: ['common', 'nav'], // string or array of namespaces to load
    defaultNS: 'common', // default namespace used if not passed to translation function

    debug: !isProduction(),

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      wait: true,
    },
  });

export default i18n;
