import manifest from "../../public/manifest.json";

/**
 * Список режимов как часто отправлять запрос за обновлениями
 * @constant
 * @type {Record<string, string>}
 * @default
 */
export const checkForUpdates: Record<string, string> = {
  MANUAL: "manual",
  DAY: "onceDay",
  WEEK: "onceWeek",
  MONTH: "onceMonth"
};

/**
 * Версия текущего приложения
 * @constant
 * @type {string}
 * @default
 */
export const CURRENT_EXT_VERSION = manifest.version;
