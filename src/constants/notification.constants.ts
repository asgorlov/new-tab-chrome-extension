/**
 * Список нотификаий
 * @category Constants - Notification
 */
export enum Notification {
  /**
   * Ошибка при получении информации о погоде
   */
  CanNotGetWeatherData = "canNotGetWeatherData",
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
  /**
   * Информация об отсутствии новых версий приложения
   */
  NoNewVersion = "noNewVersion"
}
