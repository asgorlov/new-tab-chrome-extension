/**
 * Название хранилища с данными приложения
 */
const STORE_NAME: "new-tab-db";
/**
 * Путь к свойству объекта, которое будет использоваться в качестве ключа
 */
const KEY_PATH_NAME: "key";
/**
 * Режим транзакции на чтение\запись данных
 */
const RW_MODE: "readwrite";

/**
 * Имя в базе данных параметра флага темной темы
 */
const IS_DARK_KEY: "isDark";
/**
 * Имя в базе данных параметра темного режима
 */
const DARK_MODE_KEY: "darkMode";
/**
 * Имя в базе данных параметра ночного периода
 */
const NIGHT_PERIOD_KEY: "nightPeriod";
/**
 * Имя в базе данных параметра локации
 */
const LOCATION_KEY: "location";
/**
 * Имя в базе данных параметра таймаута для проверки темного режима
 */
const CHECK_DARK_THEME_TIMEOUT_KEY: "checkDarkThemeTimeout";

/**
 * Интерфейс элемента базы данных
 */
interface DBItem {
  key: string;
  value: any;
}
/**
 * Интерфейс базы данных
 */
interface DBAdapter {
  getAll: () => Promise<DBItem[]>;
  get: <R = any>(name: string) => Promise<R | undefined>;
  put: (fields: Record<string, any>) => Promise<boolean>;
}

/**
 * Асинхронная функция для инициализации хранилища
 */
const initDB: (dbName: string) => Promise<IDBDatabase>;

/**
 * Функция для получения адаптера хранилища
 */
const getDBAdapter: (dbName: string) => DBAdapter;

export {
  STORE_NAME,
  KEY_PATH_NAME,
  RW_MODE,
  IS_DARK_KEY,
  DARK_MODE_KEY,
  NIGHT_PERIOD_KEY,
  LOCATION_KEY,
  CHECK_DARK_THEME_TIMEOUT_KEY,
  getDBAdapter,
  initDB,
  DBAdapter,
  DBItem
};
