import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import translationEng from "./Components/Localization/English/index.json";
import translationSp from "./Components/Localization/Spanish/index.json";

const languages = ["en", "sp"];

let theLanguage = localStorage.getItem("lang");

const resources = {
  en: {
    translation: translationEng,
  },
  sp: {
    translation: translationSp,
  },
};

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",
//     debug: true,
//     whiteList: languages,
//     interpolation: {
//       escapeValue: false,
//     },
//   });

i18n.use(initReactI18next).init({
  resources,
  lng: theLanguage ? theLanguage : "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
