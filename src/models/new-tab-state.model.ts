import { UpdateModel } from "./update.model";
import { CustomWallpaper } from "./custom-wallpaper.model";
import { NightPeriod } from "./night-period.model";
import { Notification } from "../constants/notification.constants";
import { SettingsStorage } from "./settings-search.model";

/**
 * Интерфейс стейта страницы <tt>New-tab</tt>
 * @property isOpenMenu - Флаг открытия меню настроек
 * @property notifications - Список нотификаций
 * @property settingsActiveKeys - Хранилище с информацией о настройках меню
 * @interface
 */
export interface NewTabState extends NewTabStateBase {
  isOpenMenu: boolean;
  notifications: Notification[];
  settingsActiveKeys: SettingsStorage<string[]>;
}

/**
 * Интерфейс стейта страницы <tt>New-tab</tt>, сохраняемого в браузере
 * @property isDark - Флаг темной темы
 * @property update - Модель обновлений
 * @property showTour - Флаг ознакомительного тура
 * @property darkMode - Режимы включения темной темы
 * @property wallpaper - Название фона приложения. Используется для разграничения стандартных и пользовательских фонов
 * @property nightPeriod - Ночной период
 * @property checkLoading - Флаг запуска проверки обновлений
 * @property searchEngine - Выбранная поисковая система
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property checkForUpdates - Режим запросов обновлений
 * @property customWallpaper - Пользовательские фоны
 * @interface
 */
export interface NewTabStateBase {
  isDark: boolean;
  update: UpdateModel;
  showTour: boolean;
  darkMode: string;
  wallpaper: string;
  nightPeriod: NightPeriod;
  checkLoading: boolean;
  searchEngine: string;
  searchEngines: string[];
  currentLanguage: string;
  checkForUpdates: string;
  customWallpaper: CustomWallpaper | null;
}
