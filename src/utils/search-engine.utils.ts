import {
  NIGMA,
  SEARCH_THEMES,
  SWISSCOWS,
  YANDEX
} from "../constants/search-engine.constants";
import { CSSProperties } from "react";

/**
 * Функция для получения названия инпута поискового запроса
 * @category Utilities - Search Engine
 * @param searchEngine - поисковая система
 * @returns - имя инпута, которое вставляется в url поискового запроса
 */
export const getInputName = (searchEngine: string): string => {
  switch (searchEngine) {
    case YANDEX:
      return "text";
    case SWISSCOWS:
    case NIGMA:
      return "query";
    default:
      return "q";
  }
};

/**
 * Функция для получения стилей селектора поисковиков
 * @category Utilities - Search Engine
 * @param searchEngine - поисковая система
 * @param isHidden - Флаг, отвечающий за скрытие компонента
 */
export const getSearchEngineSelectorStyle = (
  searchEngine: string,
  isHidden: boolean
) => {
  const style = { outlineColor: SEARCH_THEMES[searchEngine] };

  if (isHidden) {
    Object.assign(style, {
      opacity: 0,
      width: 0
    });
  }

  return style;
};

/**
 * Функция для получения стилей селектора поисковиков
 * @category Utilities - Search Engine
 * @param searchEngine - поисковая система
 * @param isHidden - Флаг, отвечающий за скрытие компонента
 * @param isActive - Флаг, отвечающий за изменение стилей, когда кнопка скроллинга нажата
 */
export const getScrollSearchEngineButtonStyle = (
  searchEngine: string,
  isHidden: boolean,
  isActive: boolean
): CSSProperties => {
  const style = { backgroundColor: SEARCH_THEMES[searchEngine] };

  if (isHidden) {
    Object.assign(style, {
      opacity: 0,
      width: 0
    });
  }

  if (isActive) {
    Object.assign(style, { filter: "brightness(0.8)" });
  }

  return style;
};
