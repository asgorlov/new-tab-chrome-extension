/**
 * Интерфейс модели обновлений
 * @interface UpdateModel
 */
export interface UpdateModel {
  /**
   * Последняя версия приложения
   */
  lastVersion: string;
  /**
   * Флаг показа сообщения об обновлении
   */
  showMessage: boolean;
  /**
   * Дата последнего запроса обновлений
   */
  lastUpdateDate: number;
  /**
   * Предыдущая версия приложения
   */
  previousVersion?: string;
}

/**
 * Интерфейс модели ответа при запросе обновлений
 * @interface UpdateModel
 */
export interface UpdateResponseModel {
  /**
   * Версия приложения
   */
  version: string;
}

/**
 * Интерфейс модели нового функционала относительно предыдущей версии приложения
 * @interface UpdateModel
 */
export interface Features {
  /**
   * Массив новых поисковых систем
   */
  searchEngines: string[];
}
