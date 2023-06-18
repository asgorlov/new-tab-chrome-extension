export const AUTO = "auto";
export const MANUAL = "manual";
export const SYSTEM = "system";

export const SEARCH_ENGINE_NAMES = [
  "yandex",
  "google",
  "duckduckgo",
  "bing",
  "yahoo",
  "brave",
  "swisscows",
  "aol",
  "youcom",
  "gibiru",
  "lycos",
  "nigma"
];

export const NIGMA = SEARCH_ENGINE_NAMES[11];
export const LYCOS = SEARCH_ENGINE_NAMES[10];
export const GIBIRU = SEARCH_ENGINE_NAMES[9];
export const YOUCOM = SEARCH_ENGINE_NAMES[8];
export const AOL = SEARCH_ENGINE_NAMES[7];
export const SWISSCOWS = SEARCH_ENGINE_NAMES[6];
export const BRAVE = SEARCH_ENGINE_NAMES[5];
export const YAHOO = SEARCH_ENGINE_NAMES[4];
export const BING = SEARCH_ENGINE_NAMES[3];
export const DUCK = SEARCH_ENGINE_NAMES[2];
export const GOOGLE = SEARCH_ENGINE_NAMES[1];
export const YANDEX = SEARCH_ENGINE_NAMES[0];

export const SEARCH_ENGINE_LINKS: Record<string, string> = {
  aol: "https://search.aol.co.uk/aol/webhome/",
  bing: "https://bing.com/",
  brave: "https://search.brave.com/",
  nigma: "https://nigma.net.ru/",
  lycos: "https://lycos.com/",
  yahoo: "https://yahoo.com/",
  yandex: "https://ya.ru/",
  youcom: "https://you.com/",
  gibiru: "https://gibiru.com/",
  google: "https://google.com/",
  swisscows: "https://swisscows.com/",
  duckduckgo: "https://duckduckgo.com/"
};

export const SEARCH_QUERY_LINKS: Record<string, string> = {
  aol: "https://search.aol.co.uk/aol/search",
  bing: "https://bing.com/search",
  brave: "https://search.brave.com/search",
  nigma: "https://nigma.net.ru/index.php",
  lycos: "https://search.lycos.com/web",
  yahoo: "https://search.yahoo.com/search",
  yandex: "https://yandex.ru/search",
  youcom: "https://you.com/search",
  gibiru: "https://gibiru.com/results.html",
  google: "https://google.com/search",
  swisscows: "https://swisscows.com/web",
  duckduckgo: "https://duckduckgo.com"
};

export const SEARCH_THEMES: Record<string, string> = {
  aol: "#2f9aff",
  bing: "#007DAA",
  brave: "#ff2000",
  nigma: "#74B61D",
  lycos: "#2e5d9a",
  yahoo: "#6001d2",
  yandex: "#fc0",
  youcom: "#4153fe",
  gibiru: "#fc243b",
  google: "#4285f4",
  swisscows: "#dc2f2f",
  duckduckgo: "#DE5833"
};
