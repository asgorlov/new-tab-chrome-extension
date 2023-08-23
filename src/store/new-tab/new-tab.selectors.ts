import { RootState } from "../store";
import { NightPeriod } from "../../models/night-period.model";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";

/**
 * Селектор получения флага темной темы
 * @category New Tab Selectors
 * @param state - стор
 * @returns - <b>true</b>, если включен темный режим
 */
export const selectIsDark = (state: RootState): boolean => state.newTab.isDark;
/**
 * Селектор получения флага показа ознакомительного тура
 * @category New Tab Selectors
 * @param state - стор
 * @returns - <b>true</b>, если необходимо показать ознакомительный тур
 */
export const selectShowTour = (state: RootState): boolean =>
  state.newTab.showTour;
/**
 * Селектор получения режима включения темной темы
 * @category New Tab Selectors
 * @param state - стор
 * @returns - режим включения темной темы
 */
export const selectDarkMode = (state: RootState): string =>
  state.newTab.darkMode;
/**
 * Селектор получения названия фона приложения
 * @category New Tab Selectors
 * @param state - стор
 * @returns - название фона приложения
 */
export const selectWallpaper = (state: RootState): string =>
  state.newTab.wallpaper;
/**
 * Селектор получения флага открытия меню настроек
 * @category New Tab Selectors
 * @param state - стор
 * @returns - <b>true</b>, если меню настроек открыто
 */
export const selectIsOpenMenu = (state: RootState): boolean =>
  Boolean(state.newTab.isOpenMenu);
/**
 * Селектор получения ночного периода
 * @category New Tab Selectors
 * @param state - стор
 * @returns - ночной период {@link NightPeriod}
 */
export const selectNightPeriod = (state: RootState): NightPeriod =>
  state.newTab.nightPeriod;
/**
 * Селектор получения последней версии приложения
 * @category New Tab Selectors
 * @param state - стор
 * @returns - последняя версия приложения
 */
export const selectLastVersion = (state: RootState): string =>
  state.newTab.update.lastVersion;
/**
 * Селектор получения флага проверки обновления
 * @category New Tab Selectors
 * @param state - стор
 * @returns - <b>true</b>, если необходимо проверить обновления
 */
export const selectCheckLoading = (state: RootState): boolean =>
  state.newTab.checkLoading;
/**
 * Селектор получения имени текущей поисковой системы
 * @category New Tab Selectors
 * @param state - стор
 * @returns - поисковая система
 */
export const selectSearchEngine = (state: RootState): string =>
  state.newTab.searchEngine;
/**
 * Селектор получения списка доступных поисковых систем
 * @category New Tab Selectors
 * @param state - стор
 * @returns - массив доступных поисковых систем
 */
export const selectSearchEngines = (state: RootState): string[] =>
  state.newTab.searchEngines;
/**
 * Селектор получения даты последнего запроса обновлений
 * @category New Tab Selectors
 * @param state - стор
 * @returns - дата последнего запроса обновлений в мс
 */
export const selectLastUpdateDate = (state: RootState): number =>
  state.newTab.update.lastUpdateDate;
/**
 * Селектор получения режима запросов обновлений
 * @category New Tab Selectors
 * @param state - стор
 * @returns - режим запросов обновлений
 */
export const selectCheckForUpdates = (state: RootState): string =>
  state.newTab.checkForUpdates;
/**
 * Селектор получения текущего языка
 * @category New Tab Selectors
 * @param state - стор
 * @returns - текущий язык
 */
export const selectCurrentLanguage = (state: RootState): string =>
  state.newTab.currentLanguage;
/**
 * Селектор получения пользовательских фоновых картинок
 * @category New Tab Selectors
 * @param state - стор
 * @returns - фоновые картинки, загруженные пользователем {@link CustomWallpaper}
 */
export const selectCustomWallpaper = (
  state: RootState
): CustomWallpaper | null => state.newTab.customWallpaper;
/**
 * Селектор получения флага показа сообщения об обновлении
 * @category New Tab Selectors
 * @param state - стор
 * @returns - <b>true</b>, если необходимо показать уведомление об обновлении
 */
export const selectShowUpdateMessage = (state: RootState): boolean =>
  state.newTab.update.showMessage;
