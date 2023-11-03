/**
 * Интерфейс объекта с информацией об элементах, удовлетворяющих поиску
 * @property item - Элемент, в котором есть поисковый запрос
 * @property textContentBackup - Резервная копия текста, в котором найден поисковый запрос
 * @interface
 */
export interface MatchedElement {
  item: Element;
  textContentBackup: string;
}

/**
 * Интерфейс подсвечиваемого текста, удовлетворяющему поиску
 * @property content - Контент с выделенным текстом
 * @property containsSearchQuery - Флаг, показывающий, что поисковый запрос содержится в контенте
 * @interface
 */
export interface HighlightedTextModel {
  content: string;
  containsSearchQuery: boolean;
}
