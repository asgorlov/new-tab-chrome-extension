import { checkForUpdates } from "../constants/update.constants";
import {
  ALEXANDRIA,
  AOL,
  ASK,
  BING,
  BOARDREADER,
  BRAVE,
  ECOSIA,
  GIBIRU,
  LYCOS,
  METAGER,
  MOJEEK,
  NIGMA,
  SEARCHCH,
  SEARCHCRYPT,
  SWISSCOWS,
  YAHOO,
  YOUCOM,
  ZAPMETA
} from "../constants/search-engine.constants";
import { setDataToChromeSyncStorage } from "./chrome.utils";
import { NewTabStateBase } from "../models/new-tab-state.model";
import { Features } from "../models/update.model";

/**
 * Функция, позволяющая узнать необходимо ли отправлять запрос за последними обновлениями
 * @category Utilities - Update
 * @param dateInMs - Дата последней проверки в мс
 * @param checkMode - Параметр, определяющий режим проверки
 * @returns - <b>True</b>, если необходима проверка обновлений
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
 * Функция, получающая ссылку на скачивание файла приложения указанной версии
 * @category Utilities - Update
 * @param version - Версия приложения
 * @returns - Url для скачивания файла приложения
 */
export const getDownloadLink = (version: string) => {
  return (
    "https://github.com/asgorlov/new-tab-chrome-extension/releases/download" +
    `/v${version}/build-v${version}.zip`
  );
};

/**
 * Функция обновляющая стейт в зависимости от версии приложения
 * @category Utilities - Update
 * @param data - Данные из браузера
 */
export const updateStateWithFeatures = (data: NewTabStateBase) => {
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
 * Функция, получающая дельту изменений в зависимости от передаваемых версий приложения
 * @category Utilities - Update
 * @param lastVersion - Последняя версия приложения
 * @param previousVersion - Предыдущая версия приложения
 * @returns - Объект с данными для обновления стейта {@link Features}
 */
export const getDeltaChanges = (
  lastVersion: string,
  previousVersion: string
): Features => {
  const searchEngines = [];

  if (previousVersion < "2.3.0" && lastVersion >= "2.3.0") {
    searchEngines.push(BING);
  }
  if (previousVersion < "2.4.0" && lastVersion >= "2.4.0") {
    searchEngines.push(YAHOO);
  }
  if (previousVersion < "3.0.1" && lastVersion >= "3.0.1") {
    searchEngines.push(GIBIRU, YOUCOM, AOL, SWISSCOWS, BRAVE);
  }
  if (previousVersion < "3.1.0" && lastVersion >= "3.1.0") {
    searchEngines.push(LYCOS, NIGMA);
  }
  if (previousVersion < "3.3.0" && lastVersion >= "3.3.0") {
    searchEngines.push(ECOSIA);
  }
  if (previousVersion < "3.4.0" && lastVersion >= "3.4.0") {
    searchEngines.push(
      SEARCHCRYPT,
      METAGER,
      ASK,
      BOARDREADER,
      ZAPMETA,
      SEARCHCH
    );
  }
  if (previousVersion < "3.5.0" && lastVersion >= "3.5.0") {
    searchEngines.push(MOJEEK, ALEXANDRIA);
  }

  return { searchEngines };
};
