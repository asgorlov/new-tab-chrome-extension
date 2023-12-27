/**
 * Список пресетов фоновых картинок
 * @category Constants - Wallpaper
 */
import { DARK_THEME_NAME, LIGHT_THEME_NAME } from "./common.constants";

/**
 * Пресеты пользовательских фоновых картинок
 * @category Constants - Wallpaper
 */
export const WALLPAPER_PRESETS = [
  "default",
  "mountains",
  "ocean",
  "field",
  "custom"
];
/**
 * Пресет пользовательской фоновой картинки
 * @category Constants - Wallpaper
 */
export const CUSTOM_WALLPAPER = WALLPAPER_PRESETS[4];
/**
 * Пресет фоновой картинки "Поле"
 * @category Constants - Wallpaper
 */
export const FIELD_WALLPAPER = WALLPAPER_PRESETS[3];
/**
 * Пресет фоновой картинки "Океан"
 * @category Constants - Wallpaper
 */
export const OCEAN_WALLPAPER = WALLPAPER_PRESETS[2];
/**
 * Пресет фоновой картинки "Горы"
 * @category Constants - Wallpaper
 */
export const MOUNTAINS_WALLPAPER = WALLPAPER_PRESETS[1];
/**
 * Пресет фоновой картинки "По умолчанию"
 * @category Constants - Wallpaper
 */
export const DEFAULT_WALLPAPER = WALLPAPER_PRESETS[0];

/**
 * Минимальный размер загружаемой картинки
 * @category Constants - Wallpaper
 */
export const MIN_SIZE_IMG = 2621440;
/**
 * Разрешенные форматы загружаемых картинок
 * @category Constants - Wallpaper
 */
export const ACCEPT_IMG_FORMAT =
  "image/jpeg,image/jpg,image/webp,image/png,image/bmp";
/**
 * Имя инпута загрузки картинки для светлой темы
 * @category Constants - Wallpaper
 */
export const LIGHT_INPUT_NAME = LIGHT_THEME_NAME;
/**
 * Имя инпута загрузки картинки для темной темы
 * @category Constants - Wallpaper
 */
export const DARK_INPUT_NAME = DARK_THEME_NAME;
/**
 * Имя инпута загрузки картинки для светлой и темной темы
 * @category Constants - Wallpaper
 */
export const BOTH_INPUT_NAME = "both";
/**
 * Статус успешной загрузки картинки
 * @category Constants - Wallpaper
 */
export const DONE_STATUS = "done";
/**
 * Статус загрузки картинки с ошибками
 * @category Constants - Wallpaper
 */
export const ERROR_STATUS = "error";
