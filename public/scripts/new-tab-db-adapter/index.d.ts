/**
 * Путь к свойству объекта, которое будет использоваться в качестве ключа
 */
const KEY_PATH_NAME: "key";
/**
 * Режим транзакции на чтение\запись данных
 */
const RW_MODE: "readwrite";
/**
 * Название хранилища с данными приложения
 */
const STORE_NAME: "new-tab-db";

/**
 * Имя в базе данных параметра флага темной темы
 */
const IS_DARK_KEY: "isDark";

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
 * Функция для получения адаптера хранилища
 */
const getDBAdapter: (dbName: string) => DBAdapter;

export {
  STORE_NAME,
  KEY_PATH_NAME,
  RW_MODE,
  IS_DARK_KEY,
  getDBAdapter,
  DBAdapter,
  DBItem
};
