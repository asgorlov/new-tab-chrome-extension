/**
 * Интерфейс модели обновлений
 * @property lastVersion - Последняя версия приложения
 * @property lastUpdateDate - Дата последнего запроса обновлений
 * @property previousVersion - Предыдущая версия приложения
 * @interface
 */
export interface UpdateModel {
  lastVersion: string;
  lastUpdateDate: number;
  previousVersion?: string;
}

/**
 * Интерфейс модели ответа при запросе обновлений
 * @property version - Версия приложения
 * @interface
 */
export interface UpdateResponseModel {
  version: string;
}

/**
 * Интерфейс модели нового функционала относительно предыдущей версии приложения
 * @property searchEngines - Массив новых поисковых систем
 * @interface
 */
export interface Features {
  searchEngines: string[];
}
