/**
 * Интерфейс опции селектора
 * @interface SelectOption
 */
export interface SelectOption {
  /**
   * Имя класса стилей
   */
  className: string;
  /**
   * Значение
   */
  value: string;
  /**
   * Отображаемый текст
   */
  label: any;
  /**
   * Внутренний идентификатор для корректной работы React в массивах
   */
  key: string;
}
