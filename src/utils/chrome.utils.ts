import {
  MANUAL,
  SEARCH_ENGINE_NAMES,
  YANDEX
} from "../constants/search-engine.constants";
import i18n from "../localizations/i18n";
import { NewTabState } from "../models/new-tab-state.model";
import { checkForUpdates } from "../constants/check-for-updates.constants";
import manifest from "../../public/manifest.json";

export const defaultStorageParameters: Readonly<NewTabState> = {
  sunset: null,
  isDark: false,
  update: {
    lastVersion: manifest.version,
    showMessage: false,
    lastUpdateDate: Date.now()
  },
  darkMode: MANUAL,
  searchEngine: YANDEX,
  searchEngines: SEARCH_ENGINE_NAMES,
  currentLanguage: i18n.language,
  checkForUpdates: checkForUpdates.WEEK
};

export const getInitStateFromChrome = async (): Promise<NewTabState> => {
  const data = chrome?.storage
    ? ((await chrome.storage.sync.get(defaultStorageParameters)) as NewTabState)
    : { ...defaultStorageParameters };

  if (!data.currentLanguage) {
    data.currentLanguage = i18n.language;
  } else if (data.currentLanguage !== i18n.language) {
    await i18n.changeLanguage(data.currentLanguage);
  }

  return data;
};

export const setDataToChrome = (items: { [key: string]: any }): boolean => {
  if (chrome?.storage) {
    chrome.storage.sync.set(items).then();

    return true;
  }

  return false;
};
