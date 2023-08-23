/**
 * Список пресетов фоновых картинок
 * @category Wallpaper Constants
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
 * @category Wallpaper Constants
 */
export const CUSTOM_WALLPAPER = WALLPAPER_PRESETS[4];
/**
 * Пресет фоновой картинки "Поле"
 * @category Wallpaper Constants
 */
export const FIELD_WALLPAPER = WALLPAPER_PRESETS[3];
/**
 * Пресет фоновой картинки "Океан"
 * @category Wallpaper Constants
 */
export const OCEAN_WALLPAPER = WALLPAPER_PRESETS[2];
/**
 * Пресет фоновой картинки "Горы"
 * @category Wallpaper Constants
 */
export const MOUNTAINS_WALLPAPER = WALLPAPER_PRESETS[1];
/**
 * Пресет фоновой картинки "По умолчанию"
 * @category Wallpaper Constants
 */
export const DEFAULT_WALLPAPER = WALLPAPER_PRESETS[0];

/**
 * Минимальный размер загружаемой картинки
 * @category Wallpaper Constants
 */
export const MIN_SIZE_IMG = 2621440;
/**
 * Разрешенные форматы загружаемых картинок
 * @category Wallpaper Constants
 */
export const ACCEPT_IMG_FORMAT =
  "image/jpeg,image/jpg,image/webp,image/png,image/bmp";
/**
 * Имя инпута загрузки картинки для светлой темы
 * @category Wallpaper Constants
 */
export const LIGHT_INPUT_NAME = "light";
/**
 * Имя инпута загрузки картинки для темной темы
 * @category Wallpaper Constants
 */
export const DARK_INPUT_NAME = "dark";
/**
 * Имя инпута загрузки картинки для светлой и темной темы
 * @category Wallpaper Constants
 */
export const BOTH_INPUT_NAME = "both";
/**
 * Статус успешной загрузки картинки
 * @category Wallpaper Constants
 */
export const DONE_STATUS = "done";
/**
 * Статус загрузки картинки с ошибками
 * @category Wallpaper Constants
 */
export const ERROR_STATUS = "error";
