/**
 * Интерфейс опции селектора
 * @property className - Название класса компонента
 * @property value - Значение
 * @property label - Отображаемый текст
 * @property key - Внутренний идентификатор для корректной работы React в массивах
 * @interface
 */
export interface SelectOption {
  className: string;
  value: string;
  label: any;
  key: string;
}
