import manifest from "../../public/manifest.json";

/**
 * Список режимов как часто отправлять запрос за обновлениями
 * @category Update Constants
 */
export const checkForUpdates: Record<string, string> = {
  MANUAL: "manual",
  DAY: "onceDay",
  WEEK: "onceWeek",
  MONTH: "onceMonth"
};

/**
 * Версия текущего приложения
 * @category Update Constants
 */
export const CURRENT_EXT_VERSION = manifest.version;
