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
  "boardreader",
  "zapmeta",
  "searchch",
  "mojeek",
  "alexandria",
  "yep",
  "izito",
  "presearch",
  "hotbot",
  "rambler",
  "entireweb",
  "exactseek",
  "startpage",
  "searxng"
];

/**
 * Поисковая система Sear XNG
 * @category Constants - Search Engine
 */
export const SEARXNG = SEARCH_ENGINE_NAMES[29];
/**
 * Поисковая система startpage
 * @category Constants - Search Engine
 */
export const STARTPAGE = SEARCH_ENGINE_NAMES[28];
/**
 * Поисковая система exact seek
 * @category Constants - Search Engine
 */
export const EXACTSEEK = SEARCH_ENGINE_NAMES[27];
/**
 * Поисковая система entireweb
 * @category Constants - Search Engine
 */
export const ENTIREWEB = SEARCH_ENGINE_NAMES[26];
/**
 * Поисковая система rambler
 * @category Constants - Search Engine
 */
export const RAMBLER = SEARCH_ENGINE_NAMES[25];
/**
 * Поисковая система hotBot
 * @category Constants - Search Engine
 */
export const HOTBOT = SEARCH_ENGINE_NAMES[24];
/**
 * Поисковая система presearch
 * @category Constants - Search Engine
 */
export const PRESEARCH = SEARCH_ENGINE_NAMES[23];
/**
 * Поисковая система izito
 * @category Constants - Search Engine
 */
export const IZITO = SEARCH_ENGINE_NAMES[22];
/**
 * Поисковая система yep.com
 * @category Constants - Search Engine
 */
export const YEP = SEARCH_ENGINE_NAMES[21];
/**
 * Поисковая система alexandria
 * @category Constants - Search Engine
 */
export const ALEXANDRIA = SEARCH_ENGINE_NAMES[20];
/**
 * Поисковая система mojeek
 * @category Constants - Search Engine
 */
export const MOJEEK = SEARCH_ENGINE_NAMES[19];
/**
 * Поисковая система Search.ch
 * @category Constants - Search Engine
 */
export const SEARCHCH = SEARCH_ENGINE_NAMES[18];
/**
 * Поисковая система Board reader
 * @category Constants - Search Engine
 */
export const ZAPMETA = SEARCH_ENGINE_NAMES[17];
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
  aol: "https://aolsearch.com",
  bing: "https://bing.com",
  brave: "https://search.brave.com",
  nigma: "https://nigma.net.ru",
  lycos: "https://lycos.com",
  yahoo: "https://yahoo.com",
  ecosia: "https://ecosia.org",
  yandex: "https://ya.ru",
  youcom: "https://you.com",
  gibiru: "https://gibiru.com",
  google: "https://google.com",
  swisscows: "https://swisscows.com",
  duckduckgo: "https://duckduckgo.com",
  searchcrypt: "https://searchencrypt.com/home",
  metager: "https://metager.org",
  ask: "https://ask.com",
  boardreader: "https://boardreader.com",
  zapmeta: "https://zapmeta.com",
  searchch: "https://search.ch",
  mojeek: "https://mojeek.com",
  alexandria: "https://alexandria.org",
  yep: "https://yep.com",
  izito: "https://izito.com",
  presearch: "https://presearch.com",
  hotbot: "https://hotbot.com/",
  rambler: "https://www.rambler.ru",
  entireweb: "https://www.entireweb.com",
  exactseek: "https://exactseek.com",
  startpage: "https://startpage.com",
  searxng: "https://search.demoniak.ch"
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
  boardreader: "https://boardreader.com/s",
  zapmeta: "https://zapmeta.com/search",
  searchch: "https://search.ch",
  mojeek: "https://mojeek.com/search",
  alexandria: "https://alexandria.org",
  yep: "https://yep.com/web",
  izito: "https://izito.com/search",
  presearch: "https://presearch.com/search",
  hotbot: "https://hotbot.com/web",
  rambler: "https://nova.rambler.ru/search",
  entireweb: "https://search.entireweb.com/search",
  exactseek: "https://exactseek.com/cgi-bin/search.cgi",
  startpage: "https://www.startpage.com/sp/search",
  searxng: "https://search.demoniak.ch/search"
};
