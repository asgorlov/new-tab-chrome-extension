import i18n from "../localizations/i18n";
import { NewTabStateBase } from "../models/new-tab-state.model";
import { updateStateWithFeatures } from "./update.utils";
import defaultStore from "../constants/default-store.constants";
import { ChromeStorage } from "../models/chrome-storage.model";

/**
 * Асинхронная функция для получения начальных данных стейта из браузера
 * @category Utilities - Chrome
 * @returns - Начальные данные {@link NewTabStateBase}
 */
export const getInitStateFromChrome = async (): Promise<NewTabStateBase> => {
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
 * Асинхронная функция для получения данных из всех хранилищ браузера
 * @category Utilities - Chrome
 * @returns - Сохраненные в браузере данные {@link NewTabStateBase}
 */
export const getDataFromChrome = async (): Promise<NewTabStateBase> => {
  let data;
  if (chrome?.storage) {
    data = (await chrome.storage.sync.get(defaultStore)) as NewTabStateBase;
    const localData = (await chrome.storage.local.get({
      showTour: true,
      customWallpaper: null
    })) as NewTabStateBase;

    data.showTour = localData.showTour;
    data.customWallpaper = localData.customWallpaper;
  } else {
    data = { ...defaultStore };
  }

  return data;
};

/**
 * Функция для сохранения данных в синхронизируемое хранилище браузера
 * @category Utilities - Chrome
 * @param items - Сохраняемые объекты
 * @returns - <b>True</b>, если данные удалось сохранить
 */
export const setDataToChromeSyncStorage = (items: ChromeStorage): boolean => {
  if (chrome?.storage) {
    chrome.storage.sync.set(items).then();

    return true;
  }

  return false;
};

/**
 * Функция для сохранения данных в локальное хранилище браузера
 * @category Utilities - Chrome
 * @param items - Сохраняемые объекты
 * @returns - <b>True</b>, если данные удалось сохранить
 */
export const setDataToChromeLocalStorage = (items: ChromeStorage): boolean => {
  if (chrome?.storage) {
    chrome.storage.local.set(items).then();

    return true;
  }

  return false;
};
