/**
 * Список нотификаий
 * @category Constants - Notification
 */
export enum Notification {
  /**
   * Ошибка при получении информации об обновлении
   */
  CanNotGetUpdateManifest = "canNotGetUpdateManifest",
  /**
   * Ошибка при получении информации времени восхода\заката для текущей геолокации
   */
  CanNotGetNightPeriod = "canNotGetNightPeriod",
  /**
   * Информация о новой версии приложения
   */
  HasNewVersion = "hasNewVersion",
  NoNewVersion = "noNewVersion"
}
