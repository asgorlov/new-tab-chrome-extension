import i18n from "../localizations/i18n";
import { NewTabState } from "../models/new-tab-state.model";
import { updateStateWithFeatures } from "./update.utils";
import defaultStore from "../constants/default-store.constants";
import { ChromeStorage } from "../models/chrome-storage.model";

/**
 * Асинхронный метод для получения начальных данных стейта из браузера
 * @return {@link NewTabState} - начальные данные
 */
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

/**
 * Асинхронный метод для получения данных из всех хранилищ браузера
 * @return {@link NewTabState} - сохраненные в браузере данные
 */
export const getDataFromChrome = async (): Promise<NewTabState> => {
  let data;
  if (chrome?.storage) {
    data = (await chrome.storage.sync.get(defaultStore)) as NewTabState;
    const localData = (await chrome.storage.local.get({
      showTour: true,
      customWallpaper: null
    })) as NewTabState;

    data.showTour = localData.showTour;
    data.customWallpaper = localData.customWallpaper;
  } else {
    data = { ...defaultStore };
  }

  return data;
};

/**
 * Метод для сохранения данных в синхронизируемое хранилище браузера
 * @param items - сохраняемые объекты
 * @return {@link boolean} - <b>true</b>, если данные удалось сохранить
 */
export const setDataToChromeSyncStorage = (items: ChromeStorage): boolean => {
  if (chrome?.storage) {
    chrome.storage.sync.set(items).then();

    return true;
  }

  return false;
};

/**
 * Метод для сохранения данных в локальное хранилище браузера
 * @param items - сохраняемые объекты
 * @return {@link boolean} - <b>true</b>, если данные удалось сохранить
 */
export const setDataToChromeLocalStorage = (items: ChromeStorage): boolean => {
  if (chrome?.storage) {
    chrome.storage.local.set(items).then();

    return true;
  }

  return false;
};
