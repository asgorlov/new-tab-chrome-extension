/**
 * Название таблицы с данными приложения
 * @category Constants - Vlcn
 */
export const TABLE_NAME = "newtab";
/**
 * Колонка с именем сохраняемого параметра
 * @category Constants - Vlcn
 */
export const KEY_COLUMN = "key";
/**
 * Колонка со значением сохраняемого параметра таблицы
 * @category Constants - Vlcn
 */
export const VALUE_COLUMN = "value";

/**
 * Запрос создания таблицы, если ее нет
 * @category Constants - Vlcn
 */
export const INIT_QUERY = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${KEY_COLUMN} primary key,${VALUE_COLUMN})`;
/**
 * Запрос на получение всех параметров из таблицы
 * @category Constants - Vlcn
 */
export const SELECT_ALL_QUERY = `SELECT * FROM ${TABLE_NAME}`;
/**
 * Запрос на удаление всех параметров в таблице
 * @category Constants - Vlcn
 */
export const DELETE_ALL_QUERY = `DELETE FROM ${TABLE_NAME}`;
