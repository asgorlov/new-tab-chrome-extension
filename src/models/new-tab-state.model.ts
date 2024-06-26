import { UpdateModel } from "./update.model";
import { CustomWallpaper } from "./custom-wallpaper.model";
import { NightPeriod } from "./night-period.model";
import { Notification } from "../constants/notification.constants";
import { SettingsStorage } from "./settings-search.model";
import { Location } from "./location.model";
import { WidgetName } from "../constants/widget.constants";
import { WeatherData, WeatherSettings } from "./weather.model";
import { ConvertibleCurrencies, MainCurrency } from "./currency.model";
import { TimeSettings } from "./time.model";

/**
 * Интерфейс стейта страницы <tt>New-tab</tt>
 * @property isOpenMenu - Флаг открытия меню настроек
 * @property notifications - Список нотификаций
 * @property settingsActiveKeys - Хранилище с информацией о настройках меню
 * @property weatherLoading - Флаг загрузки данных виджета погоды
 * @interface
 */
export interface NewTabState extends NewTabStateBase {
  isOpenMenu: boolean;
  notifications: Notification[];
  settingsActiveKeys: SettingsStorage<string[]>;
  weatherLoading: boolean;
  currencyLoading: boolean;
}

/**
 * Интерфейс стейта страницы <tt>New-tab</tt>, сохраняемого в браузере
 * @property isDark - Флаг темной темы
 * @property update - Модель обновлений
 * @property widgets - Массив виджетов
 * @property isWidgetsOnRight - Флаг, отвечающий за расположение виджетов справа или слева на экране
 * @property showTour - Флаг ознакомительного тура
 * @property darkMode - Режимы включения темной темы
 * @property wallpaper - Название фона приложения. Используется для разграничения стандартных и пользовательских фонов
 * @property searXngUrl - Ссылка на поисковую систему SearXNG
 * @property nightPeriod - Ночной период
 * @property checkLoading - Флаг запуска проверки обновлений
 * @property searchEngine - Выбранная поисковая система
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property checkForUpdates - Режим запросов обновлений
 * @property customWallpaper - Пользовательские фоны
 * @property currentLocation - Текущая геолокация пользователя
 * @property weather - Данные виджета погоды
 * @property convertibleCurrencies - Объект с информацией о валюте для конвертации
 * @property mainCurrency - Объект с информацией об основной валюте
 * @property timeSettings - Объект с настройками виджета часов
 * @property weatherSettings - Объект с настройками виджета погоды
 * @interface
 */
export interface NewTabStateBase {
  isDark: boolean;
  update: UpdateModel;
  widgets: WidgetName[];
  isWidgetsOnRight: boolean;
  showTour: boolean;
  darkMode: string;
  wallpaper: string;
  searXngUrl: string;
  nightPeriod: NightPeriod;
  checkLoading: boolean;
  searchEngine: string;
  searchEngines: string[];
  currentLanguage: string;
  checkForUpdates: string;
  customWallpaper: CustomWallpaper | null;
  currentLocation: Location | null;
  weather: WeatherData;
  convertibleCurrencies: ConvertibleCurrencies;
  mainCurrency: MainCurrency;
  timeSettings: TimeSettings;
  weatherSettings: WeatherSettings;
}
