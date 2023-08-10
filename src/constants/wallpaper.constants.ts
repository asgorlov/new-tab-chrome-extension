/**
 * Список пресетов фоновых картинок
 * @constant
 * @type {string[]}
 * @default
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
 * @constant
 * @type {Record<string, string>}
 * @default
 */
export const CUSTOM_WALLPAPER = WALLPAPER_PRESETS[4];
/**
 * Пресет фоновой картинки "Поле"
 * @constant
 * @type {string}
 * @default
 */
export const FIELD_WALLPAPER = WALLPAPER_PRESETS[3];
/**
 * Пресет фоновой картинки "Океан"
 * @constant
 * @type {string}
 * @default
 */
export const OCEAN_WALLPAPER = WALLPAPER_PRESETS[2];
/**
 * Пресет фоновой картинки "Горы"
 * @constant
 * @type {string}
 * @default
 */
export const MOUNTAINS_WALLPAPER = WALLPAPER_PRESETS[1];
/**
 * Пресет фоновой картинки "По умолчанию"
 * @constant
 * @type {string}
 * @default
 */
export const DEFAULT_WALLPAPER = WALLPAPER_PRESETS[0];

/**
 * Минимальный размер загружаемой картинки
 * @constant
 * @type {number}
 * @default
 */
export const MIN_SIZE_IMG = 2621440;
/**
 * Разрешенные форматы загружаемых картинок
 * @constant
 * @type {string}
 * @default
 */
export const ACCEPT_IMG_FORMAT =
  "image/jpeg,image/jpg,image/webp,image/png,image/bmp";
/**
 * Имя инпута загрузки картинки для светлой темы
 * @constant
 * @type {string}
 * @default
 */
export const LIGHT_INPUT_NAME = "light";
/**
 * Имя инпута загрузки картинки для темной темы
 * @constant
 * @type {string}
 * @default
 */
export const DARK_INPUT_NAME = "dark";
/**
 * Имя инпута загрузки картинки для светлой и темной темы
 * @constant
 * @type {string}
 * @default
 */
export const BOTH_INPUT_NAME = "both";
/**
 * Статус успешной загрузки картинки
 * @constant
 * @type {string}
 * @default
 */
export const DONE_STATUS = "done";
/**
 * Статус загрузки картинки с ошибками
 * @constant
 * @type {string}
 * @default
 */
export const ERROR_STATUS = "error";
