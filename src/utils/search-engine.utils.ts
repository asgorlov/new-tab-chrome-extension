import { NIGMA, SWISSCOWS, YANDEX } from "../constants/search-engine.constants";

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

export const getSearchEngineClass = (
  searchEngine: string,
  logoVariant: number
): string => {
  if (searchEngine === NIGMA) {
    return `${searchEngine}-${logoVariant}`;
  }

  return searchEngine;
};
