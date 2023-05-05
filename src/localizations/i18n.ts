import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru_RU from "./translations/ru-RU.json";
import en_US from "./translations/en-US.json";

i18n.use(initReactI18next).init({
  resources: { ...ru_RU, ...en_US },
  lng: window.navigator.language ? window.navigator.language : "en",
  fallbackLng: "en"
});

export default i18n;
