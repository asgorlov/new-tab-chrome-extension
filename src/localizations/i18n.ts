import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        tabTitle: "Новая вкладка",
        searchQuery: "Введите поисковой запрос...",
        searchButton: "Найти",
        darkModeTitle: "Темный режим",
        turnOn: "Вкл.",
        turnOff: "Выкл.",
        auto: "Авто",
        manual: "Вручную"
      }
    },
    en: {
      translation: {
        tabTitle: "New tab",
        searchQuery: "Enter search query...",
        searchButton: "Search",
        darkModeTitle: "Dark mode",
        turnOn: "On",
        turnOff: "Off",
        auto: "Auto",
        manual: "Manual"
      }
    }
  },
  lng: window.navigator.language ? window.navigator.language : "ru-RU",
  fallbackLng: "en-EN"
});

export default i18n;
