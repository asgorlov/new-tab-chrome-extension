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

export { STORE_NAME, IS_DARK_KEY, getDBAdapter, DBAdapter, DBItem };
