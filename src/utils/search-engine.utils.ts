import {
  BOARDREADER,
  METAGER,
  NIGMA,
  RAMBLER,
  SEARCH_INPUT_NAMES,
  SEARCH_THEMES,
  STARTPAGE,
  SWISSCOWS,
  YANDEX
} from "../constants/search-engine.constants";
import { CSSProperties } from "react";

/**
 * Функция для получения названия инпута поискового запроса
 * @category Utilities - Search Engine
 * @param searchEngine - Поисковая система
 * @returns - Имя инпута, которое вставляется в url поискового запроса
 */
export const getInputName = (searchEngine: string): string => {
  switch (searchEngine) {
    case YANDEX:
      return SEARCH_INPUT_NAMES[0];
    case SWISSCOWS:
    case NIGMA:
    case BOARDREADER:
    case RAMBLER:
    case STARTPAGE:
      return SEARCH_INPUT_NAMES[1];
    case METAGER:
      return SEARCH_INPUT_NAMES[2];
    default:
      return SEARCH_INPUT_NAMES[3];
  }
};

/**
 * Функция для получения стилей селектора поисковиков
 * @category Utilities - Search Engine
 * @param searchEngine - Поисковая система
 * @param isHidden - Флаг, отвечающий за скрытие компонента
 * @returns - Стили селектора поисковиков
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
 * Функция для получения стилей кнопок скроллинга
 * @category Utilities - Search Engine
 * @param searchEngine - Поисковая система
 * @param isHidden - Флаг, отвечающий за скрытие компонента
 * @param isActive - Флаг, отвечающий за изменение стилей, когда кнопка скроллинга нажата
 * @returns - Стили селектора поисковиков
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
