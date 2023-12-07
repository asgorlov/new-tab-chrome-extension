import {
  CollapsedMenuSetting,
  SETTINGS_WITH_SELECTOR,
  SETTINGS_MENU_CURRENT_CLASS,
  SETTINGS_MENU_HIGHLIGHTED_TEXT_CLASS,
  SPEC_CHARS_REG_EXP
} from "../constants/settings-menu.constants";
import {
  HighlightedTextModel,
  MatchedElement,
  SettingsStorage
} from "../models/settings-search.model";
import { MutableRefObject } from "react";

/**
 * Функция восстановления текста для поиска на исходный
 * @category Utilities - Settings Header
 * @param matchedElements - Массив элементов, удовлетворяющих поисковому запросу
 *
 */
export const resetMatchedElements = (matchedElements: MatchedElement[]) => {
  const parentsForReset: { parent: Element | null; backup: string }[] = [];
  matchedElements.forEach(e => {
    const parent = e.item.parentElement;
    const isContained =
      parent && parentsForReset.some(p => p.parent === parent);

    if (!isContained) {
      parentsForReset.push({
        parent: e.item.parentElement,
        backup: e.textContentBackup
      });
    }
  });

  parentsForReset.forEach(p => {
    if (p.parent) {
      p.parent.textContent = p.backup;
    }
  });
};

/**
 * Функция для перехода на указанный элемент
 * @category Utilities - Settings Header
 * @param matchedElements - Массив элементов, удовлетворяющих поисковому запросу
 * @param nextIndex - Индекс выбранного элемента для перехода на него
 * @param currentIndex - Индекс текущего элемента
 */
export const scrollToSelectedMatchedElement = (
  matchedElements: MatchedElement[],
  nextIndex: number,
  currentIndex: number = nextIndex
) => {
  const matchedElem = matchedElements[nextIndex];
  const nextElement = matchedElem?.item as HTMLElement;

  if (nextElement) {
    if (SETTINGS_WITH_SELECTOR.includes(matchedElem.type))
      nextElement.dispatchEvent(
        new CustomEvent("search", { bubbles: true, cancelable: true })
      );

    nextElement.scrollIntoView({ behavior: "smooth" });

    nextElement.classList.add(SETTINGS_MENU_CURRENT_CLASS);

    if (currentIndex !== nextIndex && matchedElements.length > 1) {
      matchedElements[currentIndex]?.item.classList.remove(
        SETTINGS_MENU_CURRENT_CLASS
      );
    }
  }
};

/**
 * Функция для расчета индекса следующего для перехода элемента
 * @category Utilities - Settings Header
 * @param matchedElements - Массив с элементами, удовлетворяющими поиску
 * @param currentIndex - Индекс текущего элемента в поиске
 * @param movement - Движение по поиску (вверх, вниз). По умолчанию вверх
 * @returns - Индекс следующего для перехода элемента
 */
export const getNextMatchedElementIndex = (
  matchedElements: MatchedElement[],
  currentIndex: number,
  movement?: string
): number => {
  if (matchedElements.length > 1 && movement) {
    if (movement === "down") {
      return currentIndex === matchedElements.length - 1 ? 0 : currentIndex + 1;
    } else {
      return currentIndex === 0 ? matchedElements.length - 1 : currentIndex - 1;
    }
  }

  return currentIndex;
};

/**
 * Функция получения объекта с преобразованными элементами, которые совпадают с поисковым запросом, и их резервной копией
 * @category Utilities - Settings Header
 * @param query - Поисковый запрос
 * @param context - Контейнер, в котором производится поиск
 * @returns - Массив объектов с информацией об элементах, которые совпадают с поисковым запросом {@link MatchedElement}
 */
export const matchElements = (
  query: string,
  context: SettingsStorage<MutableRefObject<HTMLDivElement | null>>
): MatchedElement[] => {
  const matchedElements: MatchedElement[] = [];

  if (query) {
    const findByQuery = (element: Element, type: CollapsedMenuSetting) => {
      if (element.children.length) {
        for (let child of element.children) {
          findByQuery(child, type);
        }
      } else {
        const textContent = element.textContent;

        if (textContent) {
          const highlightedText = getHighlightedTextModel(query, textContent);

          if (highlightedText.containsSearchQuery) {
            element.innerHTML = highlightedText.content;
            const elements = [
              ...element.querySelectorAll(
                `.${SETTINGS_MENU_HIGHLIGHTED_TEXT_CLASS}`
              )
            ].map(e => ({
              item: e,
              type,
              textContentBackup: textContent
            }));

            matchedElements.push(...elements);
          }
        }
      }
    };

    Object.entries(context).forEach(([key, value]) => {
      if (value.current) {
        findByQuery(value.current, key as CollapsedMenuSetting);
      }
    });
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
  const escapedQuery = query.replace(SPEC_CHARS_REG_EXP, "\\$&");
  const regExp = new RegExp(escapedQuery, "i");
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
        `<span class=${SETTINGS_MENU_HIGHLIGHTED_TEXT_CLASS}>${secondTextPart}</span>`
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
