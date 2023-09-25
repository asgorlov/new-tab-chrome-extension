import { RootState } from "../store";
import { NightPeriod } from "../../models/night-period.model";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { Notification } from "../../constants/notification.constants";

/**
 * Селектор получения флага темной темы
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если включен темный режим
 */
export const selectIsDark = (state: RootState): boolean => state.newTab.isDark;
/**
 * Селектор получения флага показа ознакомительного тура
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если необходимо показать ознакомительный тур
 */
export const selectShowTour = (state: RootState): boolean =>
  state.newTab.showTour;
/**
 * Селектор получения режима включения темной темы
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Режим включения темной темы
 */
export const selectDarkMode = (state: RootState): string =>
  state.newTab.darkMode;
/**
 * Селектор получения названия фона приложения
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Название фона приложения
 */
export const selectWallpaper = (state: RootState): string =>
  state.newTab.wallpaper;
/**
 * Селектор получения флага открытия меню настроек
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если меню настроек открыто
 */
export const selectIsOpenMenu = (state: RootState): boolean =>
  Boolean(state.newTab.isOpenMenu);
/**
 * Селектор получения ночного периода
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Ночной период {@link NightPeriod}
 */
export const selectNightPeriod = (state: RootState): NightPeriod =>
  state.newTab.nightPeriod;
/**
 * Селектор получения последней версии приложения
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Последняя версия приложения
 */
export const selectLastVersion = (state: RootState): string =>
  state.newTab.update.lastVersion;
/**
 * Селектор получения флага проверки обновления
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если необходимо проверить обновления
 */
export const selectCheckLoading = (state: RootState): boolean =>
  state.newTab.checkLoading;
/**
 * Селектор получения имени текущей поисковой системы
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Поисковая система
 */
export const selectSearchEngine = (state: RootState): string =>
  state.newTab.searchEngine;
/**
 * Селектор получения списка доступных поисковых систем
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Массив доступных поисковых систем
 */
export const selectSearchEngines = (state: RootState): string[] =>
  state.newTab.searchEngines;
/**
 * Селектор получения списка нотификаций
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Массив нотификаций
 */
export const selectNotifications = (state: RootState): Notification[] =>
  state.newTab.notifications;
/**
 * Селектор получения даты последнего запроса обновлений
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Дата последнего запроса обновлений в мс
 */
export const selectLastUpdateDate = (state: RootState): number =>
  state.newTab.update.lastUpdateDate;
/**
 * Селектор получения режима запросов обновлений
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Режим запросов обновлений
 */
export const selectCheckForUpdates = (state: RootState): string =>
  state.newTab.checkForUpdates;
/**
 * Селектор получения текущего языка
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Текущий язык
 */
export const selectCurrentLanguage = (state: RootState): string =>
  state.newTab.currentLanguage;
/**
 * Селектор получения пользовательских фоновых картинок
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Фоновые картинки, загруженные пользователем {@link CustomWallpaper}
 */
export const selectCustomWallpaper = (
  state: RootState
): CustomWallpaper | null => state.newTab.customWallpaper;
