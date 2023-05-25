import { SWISSCOWS, YANDEX } from "../constants/search-engine.constants";

export const getInputName = (searchEngine: string): string => {
  switch (searchEngine) {
    case YANDEX:
      return "text";
    case SWISSCOWS:
      return "query";
    default:
      return "q";
  }
};
