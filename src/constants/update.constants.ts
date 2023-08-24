import manifest from "../../public/manifest.json";

/**
 * Список режимов как часто отправлять запрос за обновлениями
 * @category Constants - Update
 */
export const checkForUpdates: Record<string, string> = {
  MANUAL: "manual",
  DAY: "onceDay",
  WEEK: "onceWeek",
  MONTH: "onceMonth"
};

/**
 * Версия текущего приложения
 * @category Constants - Update
 */
export const CURRENT_EXT_VERSION = manifest.version;
