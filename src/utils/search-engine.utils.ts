import {
  AOL,
  ASK,
  BING,
  BOARDREADER,
  BRAVE,
  DUCK,
  ECOSIA,
  GIBIRU,
  GOOGLE,
  LYCOS,
  METAGER,
  NIGMA,
  SEARCH_INPUT_NAMES,
  SEARCH_THEMES,
  SEARCHCRYPT,
  SWISSCOWS,
  YAHOO,
  YANDEX,
  YOUCOM
} from "../constants/search-engine.constants";
import { CSSProperties } from "react";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

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

/**
 * Функция для получения стилей иконок поисковиков в селекторе
 * @param draggedStyle - Стили захваченного элемента
 * @param isDragging - Флаг, отвечающий за захват элемента
 * @param itemName - Имя текущего элемента
 * @param searchEngine - Поисковая система
 * @param currentLanguage - Язык интерфейса
 * @returns - Стили иконок поисковиков в селекторе
 */
export const getDraggedStyle = (
  draggedStyle: DraggingStyle | NotDraggingStyle | undefined,
  isDragging: boolean,
  itemName: string,
  searchEngine: string,
  currentLanguage: string
): CSSProperties => {
  const style = { cursor: isDragging ? "grabbing" : "pointer" };

  if (draggedStyle) {
    Object.assign(style, draggedStyle);
  }

  let url;
  switch (itemName) {
    case YANDEX:
      if (searchEngine === itemName) {
        Object.assign(style, { filter: "grayscale(0)" });
      }

      url = require(`../static/svgs/yandex/ya-icon${
        currentLanguage !== "ru" ? "-en" : ""
      }.svg`);

      break;
    case GOOGLE:
    case DUCK:
    case BING:
    case BRAVE:
    case AOL:
    case YOUCOM:
    case NIGMA:
    case ECOSIA:
    case SEARCHCRYPT:
    case METAGER:
      if (searchEngine === itemName) {
        Object.assign(style, { filter: "grayscale(0)" });
      }
      url = require(`../static/svgs/${itemName}/${itemName}-icon.svg`);

      break;
    case SWISSCOWS:
    case GIBIRU:
    case LYCOS:
    case YAHOO:
    case ASK:
    case BOARDREADER:
      Object.assign(style, { filter: "grayscale(0)" });
      url = require(`../static/svgs/${itemName}/${itemName}-icon${
        searchEngine !== itemName ? "-grey" : ""
      }.svg`);
  }

  if (url) {
    Object.assign(style, { backgroundImage: `url(${url})` });
  }

  return style;
};
