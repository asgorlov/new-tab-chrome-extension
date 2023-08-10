/**
 * Интерфейс хранилища браузера Chrome
 * @interface ChromeStorage
 */
export interface ChromeStorage {
  /**
   * Словарь, где ключ - имя поля, значение - любой тип данных
   */
  [key: string]: any;
}
