import { NewTabStateBase } from "../models/new-tab-state.model";
import vlcn from "../db/vlcn";
import {
  KEY_COLUMN,
  SELECT_ALL_QUERY,
  TABLE_NAME,
  VALUE_COLUMN
} from "../constants/vlcn.constants";
import defaultStore from "../constants/default-store.constants";
import { VlcnStorage } from "../models/vlcn.model";
import { updateStateWithFeatures } from "./update.utils";
import i18n from "i18next";

/**
 * Асинхронная функция для получения начальных данных стейта из базы данных
 * @returns - Начальные данные {@link NewTabStateBase}
 * @category Utilities - Vlcn
 */
export const getInitStateFromDB = async (): Promise<NewTabStateBase> => {
  const data = await getOrAddAllAppData();

  if (!data.currentLanguage) {
    data.currentLanguage = i18n.language;
  } else if (data.currentLanguage !== i18n.language) {
    await i18n.changeLanguage(data.currentLanguage);
  }

  updateStateWithFeatures(data);

  return data;
};

/**
 * Асинхронная функция для добавления/изменения параметров в таблице
 * @param fields - Параметры, которые будут добавляться/обновляться в таблице
 * @category Utilities - Vlcn
 */
export const setAppData = (fields: VlcnStorage) => {
  const rawFieldsToAdd = Object.entries(fields).map(entry => [
    entry[0],
    JSON.stringify(entry[1])
  ]);
  vlcn.db.exec(getUpsetQuery(rawFieldsToAdd.length), rawFieldsToAdd.flat());
};

/**
 * Асинхронная функция для получения всех данных таблицы.
 * Недостающие параметры будут заполняться значениями по умолчанию {@link defaultStore}
 * @returns - Полученные из БД данные {@link NewTabStateBase}
 * @category Utilities - Vlcn
 */
const getOrAddAllAppData = async (): Promise<NewTabStateBase> => {
  const rawData = await vlcn.db.execA<string[]>(SELECT_ALL_QUERY);

  if (rawData.length) {
    const lengthBefore = rawData.length;
    const rawDataKeys = rawData.map(data => data[0]);

    Object.entries(defaultStore).forEach(entry => {
      const index = rawDataKeys.findIndex(key => key === entry[0]);

      if (index < 0) {
        rawData.push([entry[0], JSON.stringify(entry[1])]);
      } else {
        rawDataKeys.splice(index, 1);
      }
    });

    if (rawData.length > lengthBefore) {
      const rawFieldsToAdd = rawData.slice(lengthBefore);
      vlcn.db.exec(getUpsetQuery(rawFieldsToAdd.length), rawFieldsToAdd.flat());
    }

    return rawData.reduce(
      (acc, data) => Object.assign(acc, { [data[0]]: JSON.parse(data[1]) }),
      {}
    ) as NewTabStateBase;
  } else {
    setAppData(defaultStore);

    return defaultStore;
  }
};

/**
 * Функция для составления запроса на получение параметров из таблицы
 * @param numberOfRows - Количество строк, которые будут извлекаться из таблицы
 * @returns - Запрос с необходимым количеством получаемых параметров из таблицы
 * @category Utilities - Vlcn
 */
const getSelectQuery = (numberOfRows: number = 1): string => {
  const keys = getQueryKeyListString(numberOfRows);

  return `SELECT ${VALUE_COLUMN} FROM ${TABLE_NAME} WHERE ${KEY_COLUMN} IN ${keys}`;
};

/**
 * Функция для составления запроса на удаление параметров из таблицы
 * @param numberOfRows - Количество строк, которые будут удалены из таблицы
 * @returns - Запрос с необходимым количеством удаляемых параметров из таблицы
 * @category Utilities - Vlcn
 */
const getDeleteQuery = (numberOfRows: number = 1): string => {
  const keys = getQueryKeyListString(numberOfRows);

  return `DELETE ${VALUE_COLUMN} FROM ${TABLE_NAME} WHERE ${KEY_COLUMN} IN ${keys}`;
};

/**
 * Функция для составления запроса на добавление новых параметров в таблицу
 * @param numberOfRows - Количество строк, которые будут добавляться в таблицу
 * @returns - Запрос с необходимым количеством добавляемых параметров в таблицу
 * @category Utilities - Vlcn
 */
const getInsertQuery = (numberOfRows: number = 1): string => {
  const values = getQueryKeyValueListString(numberOfRows);

  return `INSERT INTO ${TABLE_NAME} VALUES ${values}`;
};

/**
 * Функция для составления запроса на добавление или обновление новых параметров в таблицу
 * @param numberOfRows - Количество строк, которые будут добавляться в таблицу
 * @returns - Запрос с необходимым количеством добавляемых или обновляемых параметров в таблицу
 * @category Utilities - Vlcn
 */
const getUpsetQuery = (numberOfRows: number = 1): string => {
  const values = getQueryKeyValueListString(numberOfRows);

  return `INSERT INTO newtab VALUES ${values} ON CONFLICT(${KEY_COLUMN}) DO UPDATE SET ${VALUE_COLUMN}=excluded.${VALUE_COLUMN}`;
};

/**
 * Функция для получения спецсимволов (?, ?), ...., (?, ?) в зависимости от количества строк
 * @param numberOfRows - Количество строк, для которых будут создаваться спецсимволы
 * @returns - Строка с необходимым количеством спецсимволов (?, ?)
 * @category Utilities - Vlcn
 */
const getQueryKeyValueListString = (numberOfRows: number): string => {
  const values = [];
  for (let i = 0; i < numberOfRows; i++) {
    values.push("(?, ?)");
  }

  return values.join(", ");
};

/**
 * Функция для получения спецсимволов (?, ...)
 * @param numberOfRows - Количество строк, для которых будут создаваться спецсимволы
 * @returns - Строка с необходимым количеством спец символов ?
 * @category Utilities - Vlcn
 */
const getQueryKeyListString = (numberOfRows: number): string => {
  const values = [];
  for (let i = 0; i < numberOfRows; i++) {
    values.push("?");
  }

  return `(${values.join(", ")})`;
};
