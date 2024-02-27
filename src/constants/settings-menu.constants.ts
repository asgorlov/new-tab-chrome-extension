/**
 * Класс стилей контента, удовлетворяющего поисковому запросу, для изменения цвета
 * @category Constants - Settings menu
 */
export const SETTINGS_MENU_HIGHLIGHTED_TEXT_CLASS = "highlighted-text";
/**
 * Класс стилей выбранного контента, удовлетворяющего поисковому запросу, для изменения цвета
 * @category Constants - Settings menu
 */
export const SETTINGS_MENU_CURRENT_CLASS = "current";

/**
 * Алиасы сворачиваемых настроек меню
 * @category Constants - Settings menu
 */
export enum CollapsedMenuSetting {
  /**
   * Общие настройки
   */
  COMMON = "common",
  /**
   * Настройка поисковых систем
   */
  SEARCH_ENGINE = "searchEngine",
  /**
   * Настройка темной темы
   */
  DARK_MODE = "darkMode",
  /**
   * Настройка фоновых изображений
   */
  WALLPAPER = "wallpaper",
  /**
   * Настройка обновлений
   */
  UPDATE = "update",
  /**
   * Настройка виджетов
   */
  WIDGETS = "widgets"
}
/**
 * Алиасы настроек меню
 * @category Constants - Settings menu
 */
export enum MenuSetting {
  /**
   * Настройка языка
   */
  LANGUAGE = "language"
}
/**
 * Массив с алиасами настроек, у которых есть селекторы
 * @category Constants - Settings menu
 */
export const SETTINGS_WITH_SELECTOR = [
  CollapsedMenuSetting.SEARCH_ENGINE,
  CollapsedMenuSetting.DARK_MODE,
  CollapsedMenuSetting.UPDATE,
  CollapsedMenuSetting.WIDGETS
];

/**
 * Регулярное выражение для нахождения спецсимволов
 * @category Constants - Settings menu
 */
export const SPEC_CHARS_REG_EXP = /[.*+?^${}()|[\]\\]/g;
