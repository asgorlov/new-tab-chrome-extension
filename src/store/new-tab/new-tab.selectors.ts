import { RootState } from "../store";
import { NightPeriod } from "../../models/night-period.model";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";

/**
 * Селектор получения флага темной темы
 * @param state - стор
 * @return {@link boolean} - <b>true</b>, если включен темный режим
 */
export const selectIsDark = (state: RootState): boolean => state.newTab.isDark;
/**
 * Селектор получения флага показа ознакомительного тура
 * @param state - стор
 * @return {@link boolean} - <b>true</b>, если необходимо показать ознакомительный тур
 */
export const selectShowTour = (state: RootState): boolean =>
  state.newTab.showTour;
/**
 * Селектор получения режима включения темной темы
 * @param state - стор
 * @return {@link string} - режим включения темной темы
 */
export const selectDarkMode = (state: RootState): string =>
  state.newTab.darkMode;
/**
 * Селектор получения названия фона приложения
 * @param state - стор
 * @return {@link string} - название фона приложения
 */
export const selectWallpaper = (state: RootState): string =>
  state.newTab.wallpaper;
/**
 * Селектор получения флага открытия меню настроек
 * @param state - стор
 * @return {@link boolean} - <b>true</b>, если меню настроек открыто
 */
export const selectIsOpenMenu = (state: RootState): boolean =>
  Boolean(state.newTab.isOpenMenu);
/**
 * Селектор получения ночного периода
 * @param state - стор
 * @return {@link NightPeriod} - ночной период
 */
export const selectNightPeriod = (state: RootState): NightPeriod =>
  state.newTab.nightPeriod;
/**
 * Селектор получения последней версии приложения
 * @param state - стор
 * @return {@link string} - последняя версия приложения
 */
export const selectLastVersion = (state: RootState): string =>
  state.newTab.update.lastVersion;
/**
 * Селектор получения флага проверки обновления
 * @param state - стор
 * @return {@link boolean} - <b>true</b>, если необходимо проверить обновления
 */
export const selectCheckLoading = (state: RootState): boolean =>
  state.newTab.checkLoading;
/**
 * Селектор получения имени текущей поисковой системы
 * @param state - стор
 * @return {@link string} - поисковая система
 */
export const selectSearchEngine = (state: RootState): string =>
  state.newTab.searchEngine;
/**
 * Селектор получения списка доступных поисковых систем
 * @param state - стор
 * @return {@link string[]} - массив доступных поисковых систем
 */
export const selectSearchEngines = (state: RootState): string[] =>
  state.newTab.searchEngines;
/**
 * Селектор получения даты последнего запроса обновлений
 * @param state - стор
 * @return {@link number} - дата последнего запроса обновлений в мс
 */
export const selectLastUpdateDate = (state: RootState): number =>
  state.newTab.update.lastUpdateDate;
/**
 * Селектор получения режима запросов обновлений
 * @param state - стор
 * @return {@link string} - режим запросов обновлений
 */
export const selectCheckForUpdates = (state: RootState): string =>
  state.newTab.checkForUpdates;
/**
 * Селектор получения текущего языка
 * @param state - стор
 * @return {@link string} - текущий язык
 */
export const selectCurrentLanguage = (state: RootState): string =>
  state.newTab.currentLanguage;
/**
 * Селектор получения пользовательских фоновых картинок
 * @param state - стор
 * @return {@link CustomWallpaper} - фоновые картинки, загруженные пользователем
 */
export const selectCustomWallpaper = (
  state: RootState
): CustomWallpaper | null => state.newTab.customWallpaper;
/**
 * Селектор получения флага показа сообщения об обновлении
 * @param state - стор
 * @return {@link boolean} - <b>true</b>, если необходимо показать уведомление об обновлении
 */
export const selectShowUpdateMessage = (state: RootState): boolean =>
  state.newTab.update.showMessage;
