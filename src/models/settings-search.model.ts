import { CollapsedMenuSetting } from "../constants/settings-menu.constants";

/**
 * Интерфейс объекта с информацией об элементах, удовлетворяющих поиску
 * @property item - Элемент, в котором есть поисковый запрос
 * @property textContentBackup - Резервная копия текста, в котором найден поисковый запрос
 * @interface
 */
export interface MatchedElement {
  item: Element;
  type: CollapsedMenuSetting;
  textContentBackup: string;
}

/**
 * Интерфейс хранилища информации о настройках, по которым будет совершаться поиск
 * @interface
 */
export interface SettingsStorage<T> {
  [key: CollapsedMenuSetting | string]: T;
}
