import {
  SETTINGS_MENU_CONTENT_CLASS,
  FOUND_SEARCH_QUERY,
  SETTINGS_MENU_HIGHLIGHTED_TEXT
} from "../constants/settings-menu.constants";
import { HighlightedTextModel } from "../models/highlighted-text.model";

/**
 * Функция для перехода на указанный элемент
 * @category Utilities - Settings Header
 * @param selectedIndex - Индекс выбранного элемента
 * @param foundElements - Массив элементов, удовлетворяющих поисковому запросу
 */
export const scrollToSelectedElement = (
  selectedIndex: number,
  foundElements: Element[]
) => {
  const element = foundElements[selectedIndex];

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    enrichFoundElementsWithColor(selectedIndex, foundElements);
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
      const findByQuery = (element: Element) => {
        if (element.children.length) {
          for (let child of element.children) {
            findByQuery(child);
          }
        } else {
          const textContent = element.textContent;

          if (textContent) {
            const highlightedText = getHighlightedTextModel(query, textContent);

            if (highlightedText.containsSearchQuery) {
              element.innerHTML = highlightedText.content;
              const elementsByQuery = element.querySelectorAll(
                `[data-name='${FOUND_SEARCH_QUERY}']`
              );
              matchedElements.push(...elementsByQuery);
            }
          }
        }
      };

      for (let child of menuContainer.children) {
        findByQuery(child);
      }
    }
  }

  return matchedElements;
};

/**
 * Функция для получения подсвеченного текста, который удовлетворяет поисковому запросу
 * @category Utilities - Settings Header
 * @param query - Поисковый запрос
 * @param text - Текст для поиска
 * @returns - Объект подсвечиваемого текста, удовлетворяющему поиску {@link HighlightedTextModel}
 */
const getHighlightedTextModel = (
  query: string,
  text: string
): HighlightedTextModel => {
  let content = text;
  const regExp = new RegExp(query, "i");
  let startingIndex = content.search(regExp);
  const containsSearchQuery = startingIndex !== -1;

  if (containsSearchQuery) {
    let verifiableText = content;
    let result: string[] = [];

    while (startingIndex > -1) {
      let endingIndex = startingIndex + query.length;
      const firstTextPart = verifiableText.substring(0, startingIndex);
      const secondTextPart = verifiableText.substring(
        startingIndex,
        endingIndex
      );

      result.push(
        firstTextPart,
        `<span data-name=${FOUND_SEARCH_QUERY}>${secondTextPart}</span>`
      );

      verifiableText = verifiableText.substring(
        endingIndex,
        verifiableText.length
      );
      startingIndex = verifiableText.search(regExp);
    }

    content = result.join("") + verifiableText;
  }

  return { content: content ?? "", containsSearchQuery };
};

/**
 * Функция изменения цвета поискового текста
 * @category Utilities - Settings Header
 * @param selectedIndex - Индекс выбранного элемента
 * @param foundElements - Массив элементов, удовлетворяющих поисковому запросу
 */
const enrichFoundElementsWithColor = (
  selectedIndex: number,
  foundElements: Element[]
) => {
  const currentClass = "current";

  foundElements.forEach(e => e.classList.add(SETTINGS_MENU_HIGHLIGHTED_TEXT));

  foundElements[selectedIndex].classList.add(currentClass);

  if (foundElements.length > 1) {
    const previousIndex =
      selectedIndex === 0 ? foundElements.length - 1 : selectedIndex - 1;
    foundElements[previousIndex].classList.remove(currentClass);
  }
};
