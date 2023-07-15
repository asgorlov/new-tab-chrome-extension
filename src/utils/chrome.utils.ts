import i18n from "../localizations/i18n";
import { NewTabState } from "../models/new-tab-state.model";
import { updateStateWithFeatures } from "./update.utils";
import defaultStore from "../constants/default-store.constants";
import { ChromeStorage } from "../models/chrome-storage.model";

export const getInitStateFromChrome = async (): Promise<NewTabState> => {
  const data = await getDataFromChrome();

  if (!data.currentLanguage) {
    data.currentLanguage = i18n.language;
  } else if (data.currentLanguage !== i18n.language) {
    await i18n.changeLanguage(data.currentLanguage);
  }

  updateStateWithFeatures(data);

  return data;
};

export const getDataFromChrome = async (): Promise<NewTabState> => {
  let data;
  if (chrome?.storage) {
    data = (await chrome.storage.sync.get(defaultStore)) as NewTabState;
    const localData = (await chrome.storage.local.get({
      customWallpaper: null
    })) as NewTabState;

    data.customWallpaper = localData.customWallpaper;
  } else {
    data = { ...defaultStore };
  }

  return data;
};

export const setDataToChromeSyncStorage = (items: ChromeStorage): boolean => {
  if (chrome?.storage) {
    chrome.storage.sync.set(items).then();

    return true;
  }

  return false;
};

export const setDataToChromeLocalStorage = (items: ChromeStorage): boolean => {
  if (chrome?.storage) {
    chrome.storage.local.set(items).then();

    return true;
  }

  return false;
};
