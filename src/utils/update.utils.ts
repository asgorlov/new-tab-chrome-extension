import { checkForUpdates } from "../constants/update.constants";
import {
  AOL,
  BING,
  BRAVE,
  ECOSIA,
  GIBIRU,
  LYCOS,
  NIGMA,
  SWISSCOWS,
  YAHOO,
  YOUCOM
} from "../constants/search-engine.constants";
import { setDataToChromeSyncStorage } from "./chrome.utils";
import { NewTabState } from "../models/new-tab-state.model";
import { Features } from "../models/update.model";

/**
 * Метод, позволяющий узнать необходимо ли отправлять запрос за последними обновлениями
 * @param dateInMs - дата последней проверки в мс
 * @param checkMode - параметр, определяющий режим проверки
 * @return {@link boolean} - <b>true</b>, если необходима проверка обновлений
 */
export const shouldBeCheck = (dateInMs: number, checkMode: string): boolean => {
  const delta = (Date.now() - dateInMs) / 86400000;

  switch (checkMode) {
    case checkForUpdates.DAY:
      return delta > 1;
    case checkForUpdates.WEEK:
      return delta > 7;
    case checkForUpdates.MONTH:
      return delta > 30;
    default:
      return false;
  }
};

/**
 * Метод, получающий ссылку на скачивание файла приложения указанной версии
 * @param version - версия приложения
 * @return {@link string} - url для скачивания файла приложения
 */
export const getDownloadLink = (version: string) => {
  return (
    "https://github.com/asgorlov/new-tab-chrome-extension/releases/download" +
    `/v${version}/build-v${version}.zip`
  );
};

/**
 * Метод обновляющий стейт в зависимости от версии приложения
 * @param data - данные из браузера
 */
export const updateStateWithFeatures = (data: NewTabState) => {
  if (!data.update.previousVersion) {
    data.update.previousVersion = data.update.lastVersion;
    setDataToChromeSyncStorage({ update: data.update });
  }

  if (data.update.previousVersion < data.update.lastVersion) {
    const features = getDeltaChanges(
      data.update.lastVersion,
      data.update.previousVersion
    );

    features.searchEngines
      .filter(searchEngine => !data.searchEngines.includes(searchEngine))
      .forEach(searchEngine => data.searchEngines.push(searchEngine));

    data.update.previousVersion = data.update.lastVersion;

    setDataToChromeSyncStorage({
      searchEngines: data.searchEngines,
      update: data.update
    });
  }
};

/**
 * Метод, получающий дельту изменений в зависимости от передаваемых версий приложения
 * @param lastVersion - последняя версия приложения
 * @param previousVersion - предыдущая версия приложения
 * @return {@link Features} - объект с данными для обновления стейта
 */
const getDeltaChanges = (
  lastVersion: string,
  previousVersion: string
): Features => {
  if (previousVersion <= "2.2.0") {
    return {
      searchEngines: [
        BING,
        YAHOO,
        BRAVE,
        SWISSCOWS,
        AOL,
        YOUCOM,
        GIBIRU,
        LYCOS,
        NIGMA
      ]
    };
  }

  if (previousVersion === "2.3.0") {
    return {
      searchEngines: [
        YAHOO,
        BRAVE,
        SWISSCOWS,
        AOL,
        YOUCOM,
        GIBIRU,
        LYCOS,
        NIGMA
      ]
    };
  }

  if (previousVersion === "2.4.0") {
    return {
      searchEngines: [BRAVE, SWISSCOWS, AOL, YOUCOM, GIBIRU, LYCOS, NIGMA]
    };
  }

  if (previousVersion <= "3.0.2") {
    return {
      searchEngines: [LYCOS, NIGMA]
    };
  }

  if (previousVersion === "3.1.0") {
    return {
      searchEngines: [ECOSIA]
    };
  }

  return { searchEngines: [] };
};
