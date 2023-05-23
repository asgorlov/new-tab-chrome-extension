export const AUTO = "auto";
export const MANUAL = "manual";

export const SEARCH_ENGINE_NAMES = [
  "yandex",
  "google",
  "duckduckgo",
  "bing",
  "yahoo"
];
export const YAHOO = SEARCH_ENGINE_NAMES[4];
export const BING = SEARCH_ENGINE_NAMES[3];
export const DUCK = SEARCH_ENGINE_NAMES[2];
export const GOOGLE = SEARCH_ENGINE_NAMES[1];
export const YANDEX = SEARCH_ENGINE_NAMES[0];

export const SEARCH_ENGINE_LINKS: Record<string, string> = {
  bing: "https://www.bing.com/",
  yahoo: "https://www.yahoo.com/",
  yandex: "https://ya.ru/",
  google: "https://google.com/",
  duckduckgo: "https://duckduckgo.com/"
};

export const SEARCH_QUERY_LINKS: Record<string, string> = {
  bing: "https://www.bing.com/search",
  yahoo: "https://www.search.yahoo.com/search",
  yandex: "https://yandex.ru/search",
  google: "https://google.com/search",
  duckduckgo: "https://duckduckgo.com"
};

export const SEARCH_THEMES: Record<string, string> = {
  bing: "#007DAA",
  yahoo: "#6001d2",
  yandex: "#fc0",
  google: "#4285f4",
  duckduckgo: "#DE5833"
};
