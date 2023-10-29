import { SETTINGS_MENU_CONTENT_CLASS } from "../constants/settings-menu.constants";

/**
 * Функция для перехода на указанный элемент
 * @category Utilities - Settings Header
 * @param element - Элемент, на который будет переход
 */
export const scrollToElement = (element?: Element | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Функция для расчета индекса следующего для перехода элемента
 * @category Utilities - Settings Header
 * @param buttonName - Имя нажатой кнопки в меню навигации поиска
 * @param currentFoundElement - Текущий номер элемента в поиске
 * @param foundElements - Массив с элементами, удовлетворяющими поиску
 * @returns - Индекс следующего для перехода элемента
 */
export const getNextElementIndex = (
  buttonName: string,
  currentFoundElement: number,
  foundElements: Element[]
): number => {
  const currentElementIndex = currentFoundElement - 1;

  if (buttonName === "up") {
    return currentElementIndex === 0
      ? foundElements.length - 1
      : currentElementIndex - 1;
  } else {
    return currentElementIndex === foundElements.length - 1
      ? 0
      : currentElementIndex + 1;
  }
};

/**
 * Функция получения массива элементов, удовлетворяющих поиску
 * @category Utilities - Settings Header
 * @param query - Поисковый запрос
 * @returns - Массив элементов, удовлетворяющих поиску
 */
export const getMatchedElements = (query: string): Element[] => {
  const matchedElements: Element[] = [];

  if (query) {
    const menuContainer = document.querySelector(
      `.${SETTINGS_MENU_CONTENT_CLASS}`
    );

    if (menuContainer) {
      const searchPattern = new RegExp(query, "gi");
      const findByQuery = (element: Element) => {
        if (element.children.length) {
          for (let child of element.children) {
            findByQuery(child);
          }
        } else if (element.textContent?.match(searchPattern)?.length) {
          matchedElements.push(element);
        }
      };

      for (let child of menuContainer.children) {
        findByQuery(child);
      }
    }
  }

  return matchedElements;
};
