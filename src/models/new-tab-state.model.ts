import { UpdateModel } from "./update.model";
import { CustomWallpaper } from "./custom-wallpaper.model";
import { NightPeriod } from "./night-period.model";

/**
 * Интерфейс стейта страницы <tt>New-tab</tt>
 * @interface NewTabState
 */
export interface NewTabState {
  /**
   * Флаг темной темы
   */
  isDark: boolean;
  /**
   * Модель обновлений
   */
  update: UpdateModel;
  /**
   * Флаг ознакомительного тура
   */
  showTour: boolean;
  /**
   * Режимы включения темной темы
   */
  darkMode: string;
  /**
   * Название фона приложения. Используется для разграничения стандартных и пользовательских фонов
   */
  wallpaper: string;
  /**
   * Флаг открытия меню настроек
   */
  isOpenMenu?: boolean;
  /**
   * Ночной период
   */
  nightPeriod: NightPeriod;
  /**
   * Флаг проверки обновлений
   */
  checkLoading: boolean;
  /**
   * Выбранная поисковая система
   */
  searchEngine: string;
  /**
   * Список выбранных поисковых систем для переключения
   */
  searchEngines: string[];
  /**
   * Текущий язык
   */
  currentLanguage: string;
  /**
   * Режим запросов обновлений
   */
  checkForUpdates: string;
  /**
   * Пользовательские фоны
   */
  customWallpaper: CustomWallpaper | null;
}
