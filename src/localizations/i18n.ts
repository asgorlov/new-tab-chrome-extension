import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resourceGetter = resourcesToBackend(
  (language: string) => import(`./translations/${language}.json`)
);
const i18nextOptions = {
  // debug: true,
  detection: {
    order: ["localStorage", "navigator"]
  },
  fallbackLng: ["en", "ru"]
};

await i18n
  .use(LanguageDetector)
  .use(resourceGetter)
  .use(initReactI18next)
  .init(i18nextOptions);

export default i18n;
