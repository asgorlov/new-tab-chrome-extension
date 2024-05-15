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
   * Ошибка при получении доступных валют для конвертации
   */
  CanNotGetAvailableConvertibleCurrencies = "canNotGetAvailableConvertibleCurrencies",
  /**
   * Ошибка при получении курса валют
   */
  CanNotGetExchangeRate = "canNotGetExchangeRate",
  /**
   * Ошибка при получении основной валюты по координатам
   */
  CanNotGetMainCurrencyByLocation = "canNotGetMainCurrencyByLocation",
  /**
   * Информация о новой версии приложения
   */
  HasNewVersion = "hasNewVersion",
  /**
   * Информация об отсутствии новых версий приложения
   */
  NoNewVersion = "noNewVersion"
}
