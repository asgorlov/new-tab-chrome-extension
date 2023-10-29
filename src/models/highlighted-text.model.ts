/**
 * Интерфейс подсвечиваемого текста, удовлетворяющему поиску
 * @interface
 */
export interface HighlightedTextModel {
  content: string;
  containsSearchQuery: boolean;
}
