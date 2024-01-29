/**
 * Название хранилища с данными приложения
 */
export const STORE_NAME: "new-tab-db";
/**
 * Путь к свойству объекта, которое будет использоваться в качестве ключа
 */
export const KEY_PATH_NAME: "key";
/**
 * Режим транзакции на чтение\запись данных
 */
export const RW_MODE: "readwrite";

/**
 * Асинхронная функция для инициализации хранилища
 * @returns - Полученные хранилища {@link IDBDatabase}
 */
export const initDB: () => Promise<IDBDatabase>;
