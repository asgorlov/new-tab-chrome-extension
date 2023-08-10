import { NIGMA, SWISSCOWS, YANDEX } from "../constants/search-engine.constants";

/**
 * Метод для получения названия инпута поискового запроса
 * @param searchEngine - поисковая система
 * @return {@link string} - имя инпута, которое вставляется в url поискового запроса
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
