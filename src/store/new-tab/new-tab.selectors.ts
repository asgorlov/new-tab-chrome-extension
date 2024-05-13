import { RootState } from "../store";
import { NightPeriod } from "../../models/night-period.model";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { Notification } from "../../constants/notification.constants";
import { SettingsStorage } from "../../models/settings-search.model";
import { CollapsedMenuSetting } from "../../constants/settings-menu.constants";
import { createSelector } from "@reduxjs/toolkit";
import { Location } from "../../models/location.model";
import { WidgetName } from "../../constants/widget.constants";
import { WeatherData, WeatherSettings } from "../../models/weather.model";
import {
  ConvertibleCurrencies,
  MainCurrency
} from "../../models/currency.model";
import { TimeSettings } from "../../models/time.model";

/**
 * Селектор получения флага темной темы
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если включен темный режим
 */
export const selectIsDark = (state: RootState): boolean => state.newTab.isDark;
/**
 * Селектор получения виджетов
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Массив выбранных виджетов {@link WidgetName}
 */
export const selectWidgets = (state: RootState): WidgetName[] =>
  state.newTab.widgets;
/**
 * Селектор получения флага расположения виджетов на экране
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если виджеты располагаются справа на экране
 */
export const selectIsWidgetsOnRight = (state: RootState): boolean =>
  state.newTab.isWidgetsOnRight;
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
 * Селектор получения ссылки на поисковую систему SearXNG
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Ссылка на поисковую систему SearXNG
 */
export const selectSearXngUrl = (state: RootState): string =>
  state.newTab.searXngUrl;
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
 * @returns - Фоновые картинки, загруженные пользователем {@link CustomWallpaper} или null
 */
export const selectCustomWallpaper = (
  state: RootState
): CustomWallpaper | null => state.newTab.customWallpaper;
/**
 * Селектор получения текущей геолокации пользователя
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Текущая геолокация пользователя {@link Location} или null
 */
export const selectCurrentLocation = (state: RootState): Location | null =>
  state.newTab.currentLocation;
/**
 * Селектор получения списка всех настроек меню
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Хранилище с информацией о настройках меню {@link SettingsStorage}
 */
export const selectAllSettingsActiveKeys = (
  state: RootState
): SettingsStorage<string[]> => state.newTab.settingsActiveKeys;
/**
 * Селектор получения запрашиваемой настройки меню
 * @category Selectors - New Tab
 * @param state - Стор
 * @param name - Алиас настройки меню
 * @returns - Массив с ключами раскрытых настроек, если пустой, значит настройка свернута
 */
export const selectSettingActiveKeysByName = createSelector(
  [
    selectAllSettingsActiveKeys,
    (state: RootState, name: CollapsedMenuSetting): CollapsedMenuSetting => name
  ],
  (
    allActiveKeys: SettingsStorage<string[]>,
    name: CollapsedMenuSetting
  ): string[] => allActiveKeys[name]
);
/**
 * Селектор получения данных виджета погоды
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Объект с информацией о погоде {@link WeatherData}
 */
export const selectWeather = (state: RootState): WeatherData =>
  state.newTab.weather;
/**
 * Селектор загрузки данных виджета погоды
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если производится загрузка данных
 */
export const selectWeatherLoading = (state: RootState): boolean =>
  state.newTab.weatherLoading;
/**
 * Селектор получения данных о валюте для конвертации
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Объект с информацией о валюте для конвертации {@link ConvertibleCurrencies}
 */
export const selectConvertibleCurrencies = (
  state: RootState
): ConvertibleCurrencies => state.newTab.convertibleCurrencies;
/**
 * Селектор получения данных об основной валюте
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Объект с информацией об основной валюте {@link MainCurrency}
 */
export const selectMainCurrency = (state: RootState): MainCurrency =>
  state.newTab.mainCurrency;
/**
 * Селектор получения загрузки данных о валюте для конвертации
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - <b>True</b>, если производится загрузка данных
 */
export const selectCurrencyLoading = (state: RootState): boolean =>
  state.newTab.currencyLoading;
/**
 * Селектор получения настроек виджета времени
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Объект с настройками виджета часов {@link TimeSettings}
 */
export const selectTimeSettings = (state: RootState): TimeSettings =>
  state.newTab.timeSettings;

/**
 * Селектор получения настроек виджета погоды
 * @category Selectors - New Tab
 * @param state - Стор
 * @returns - Объект с настройками виджета погоды {@link WeatherSettings}
 */
export const selectWeatherSettings = (state: RootState): WeatherSettings =>
  state.newTab.weatherSettings;
