import { UpdateModel } from "./update.model";
import { CustomWallpaper } from "./custom-wallpaper.model";
import { NightPeriod } from "./night-period.model";

/**
 * Интерфейс стейта страницы <tt>New-tab</tt>
 * @property isDark - Флаг темной темы
 * @property update - Модель обновлений
 * @property showTour - Флаг ознакомительного тура
 * @property darkMode - Режимы включения темной темы
 * @property wallpaper - Название фона приложения. Используется для разграничения стандартных и пользовательских фонов
 * @property isOpenMenu - Флаг открытия меню настроек
 * @property nightPeriod - Ночной период
 * @property checkLoading - Флаг запуска проверки обновлений
 * @property searchEngine - Выбранная поисковая система
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property currentLanguage - Текущий язык
 * @property checkForUpdates - Режим запросов обновлений
 * @property customWallpaper - Пользовательские фоны
 * @interface
 */
export interface NewTabState {
  isDark: boolean;
  update: UpdateModel;
  showTour: boolean;
  darkMode: string;
  wallpaper: string;
  isOpenMenu?: boolean;
  nightPeriod: NightPeriod;
  checkLoading: boolean;
  searchEngine: string;
  searchEngines: string[];
  currentLanguage: string;
  checkForUpdates: string;
  customWallpaper: CustomWallpaper | null;
}
