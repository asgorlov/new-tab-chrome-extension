import constants from "../static/styles/modules/constants.module.scss";

/**
 * Значение режима автоматического включения темной темы
 * @category Constants - Search Engine
 */
export const AUTO = "auto";
/**
 * Значение режима ручного включения темной темы
 * @category Constants - Search Engine
 */
export const MANUAL = "manual";
/**
 * Значение режима включения темной темы как в системе
 * @category Constants - Search Engine
 */
export const SYSTEM = "system";

/**
 * Имена поля ввода для поиска
 * @category Constants - Search Engine
 */
export const SEARCH_INPUT_NAMES = ["text", "query", "eingabe", "q"];

/**
 * Список всех поисковых систем
 * @category Constants - Search Engine
 */
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
  "nigma",
  "ecosia",
  "searchcrypt",
  "metager",
  "ask",
  "boardreader"
];

/**
 * Поисковая система Board reader
 * @category Constants - Search Engine
 */
export const BOARDREADER = SEARCH_ENGINE_NAMES[16];
/**
 * Поисковая система Ask.com
 * @category Constants - Search Engine
 */
export const ASK = SEARCH_ENGINE_NAMES[15];
/**
 * Поисковая система Metager
 * @category Constants - Search Engine
 */
export const METAGER = SEARCH_ENGINE_NAMES[14];
/**
 * Поисковая система Search Encrypt
 * @category Constants - Search Engine
 */
export const SEARCHCRYPT = SEARCH_ENGINE_NAMES[13];
/**
 * Поисковая система Ecosia
 * @category Constants - Search Engine
 */
export const ECOSIA = SEARCH_ENGINE_NAMES[12];
/**
 * Поисковая система Nigma
 * @category Constants - Search Engine
 */
export const NIGMA = SEARCH_ENGINE_NAMES[11];
/**
 * Поисковая система Lycos
 * @category Constants - Search Engine
 */
export const LYCOS = SEARCH_ENGINE_NAMES[10];
/**
 * Поисковая система Gibiru
 * @category Constants - Search Engine
 */
export const GIBIRU = SEARCH_ENGINE_NAMES[9];
/**
 * Поисковая система You.com
 * @category Constants - Search Engine
 */
export const YOUCOM = SEARCH_ENGINE_NAMES[8];
/**
 * Поисковая система AOL
 * @category Constants - Search Engine
 */
export const AOL = SEARCH_ENGINE_NAMES[7];
/**
 * Поисковая система Swisscows
 * @category Constants - Search Engine
 */
export const SWISSCOWS = SEARCH_ENGINE_NAMES[6];
/**
 * Поисковая система Brave
 * @category Constants - Search Engine
 */
export const BRAVE = SEARCH_ENGINE_NAMES[5];
/**
 * Поисковая система Yahoo
 * @category Constants - Search Engine
 */
export const YAHOO = SEARCH_ENGINE_NAMES[4];
/**
 * Поисковая система Bing
 * @category Constants - Search Engine
 */
export const BING = SEARCH_ENGINE_NAMES[3];
/**
 * Поисковая система Duck Duck Go
 * @category Constants - Search Engine
 */
export const DUCK = SEARCH_ENGINE_NAMES[2];
/**
 * Поисковая система Google
 * @category Constants - Search Engine
 */
export const GOOGLE = SEARCH_ENGINE_NAMES[1];
/**
 * Поисковая система Yandex
 * @category Constants - Search Engine
 */
export const YANDEX = SEARCH_ENGINE_NAMES[0];

/**
 * Список домашних страниц поисковых систем
 * @category Constants - Search Engine
 */
export const SEARCH_ENGINE_LINKS: Record<string, string> = {
  aol: "https://aolsearch.com/",
  bing: "https://bing.com/",
  brave: "https://search.brave.com/",
  nigma: "https://nigma.net.ru/",
  lycos: "https://lycos.com/",
  yahoo: "https://yahoo.com/",
  ecosia: "https://ecosia.org/",
  yandex: "https://ya.ru/",
  youcom: "https://you.com/",
  gibiru: "https://gibiru.com/",
  google: "https://google.com/",
  swisscows: "https://swisscows.com/",
  duckduckgo: "https://duckduckgo.com/",
  searchcrypt: "https://searchencrypt.com/home",
  metager: "https://metager.org/",
  ask: "https://ask.com/",
  boardreader: "https://boardreader.com/"
};

/**
 * Список ссылок запросов поисковых систем
 * @category Constants - Search Engine
 */
export const SEARCH_QUERY_LINKS: Record<string, string> = {
  aol: "https://aolsearch.com/search",
  bing: "https://bing.com/search",
  brave: "https://search.brave.com/search",
  nigma: "https://nigma.net.ru/index.php",
  lycos: "https://search.lycos.com/web",
  yahoo: "https://search.yahoo.com/search",
  ecosia: "https://ecosia.org/search",
  yandex: "https://yandex.ru/search",
  youcom: "https://you.com/search",
  gibiru: "https://gibiru.com/results.html",
  google: "https://google.com/search",
  swisscows: "https://swisscows.com/web",
  duckduckgo: "https://duckduckgo.com",
  searchcrypt: "https://searchencrypt.com/search",
  metager: "https://metager.org/meta/meta.ger3",
  ask: "https://ask.com/web",
  boardreader: "https://boardreader.com/s"
};

/**
 * Список цветовых схем поисковых систем
 * @category Constants - Search Engine
 */
export const SEARCH_THEMES: Record<string, string> = {
  aol: constants.aolColor,
  bing: constants.bingColor,
  brave: constants.braveColor,
  nigma: constants.nigmaColor,
  lycos: constants.lycosColor,
  yahoo: constants.yahooColor,
  ecosia: constants.ecosiaColor,
  yandex: constants.yaColor,
  youcom: constants.youcomColor,
  gibiru: constants.gibiruColor,
  google: constants.gooColor,
  swisscows: constants.cowsColor,
  duckduckgo: constants.duckColor,
  searchcrypt: constants.searchcryptColor,
  metager: constants.metagerColor,
  ask: constants.askColor,
  boardreader: constants.boardreaderColor
};
