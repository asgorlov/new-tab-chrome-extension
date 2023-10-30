/**
 * Интерфейс объекта с информацией об элементах, удовлетворяющих поиску
 * @interface
 */
export interface MatchedElement {
  item: Element;
  textContentBackup: string;
}

/**
 * Интерфейс подсвечиваемого текста, удовлетворяющему поиску
 * @interface
 */
export interface HighlightedTextModel {
  content: string;
  containsSearchQuery: boolean;
}
