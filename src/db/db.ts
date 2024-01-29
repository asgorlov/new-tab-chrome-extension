import { NewTabStateBase } from "../models/new-tab-state.model";
import { initDB, RW_MODE, STORE_NAME } from "init-db";
import defaultStore from "../constants/default-store.constants";
import { DBItem, DBModel } from "../models/db.model";
import { updateStateWithFeatures } from "../utils/update.utils";
import i18n from "i18next";

/**
 * Объект хранилища
 * @category IndexedDB
 */
const database = await initDB();

/**
 * Асинхронная функция для добавления/изменения параметров в хранилище
 * @param fields - Параметры, которые будут добавляться/обновляться в хранилище
 * @category IndexedDB
 */
const setAppData = (fields: Record<string, any>) => {
  const transaction = database.transaction(STORE_NAME, RW_MODE);
  const store = transaction.objectStore(STORE_NAME);

  Object.entries(fields)
    .map(entry => ({
      key: entry[0],
      value: entry[1]
    }))
    .forEach(item => {
      store.put(item);
    });
};

/**
 * Асинхронная функция для получения всех данных хранилища.
 * Недостающие параметры будут заполняться значениями по умолчанию {@link defaultStore}
 * @returns - Полученные из хранилища данные {@link NewTabStateBase}
 * @category IndexedDB
 */
const getOrAddAllDBData = (): Promise<NewTabStateBase> => {
  return new Promise(resolve => {
    const transaction = database.transaction(STORE_NAME, RW_MODE);
    const store = transaction.objectStore(STORE_NAME);

    store.getAll().onsuccess = (event: Event) => {
      const defaultStoreEntries = Object.entries(defaultStore);
      const database = event.target as IDBRequest<DBItem[]>;
      const rawData = database.result;

      if (rawData.length) {
        const rawDataKeys = rawData.map(item => item.key);

        defaultStoreEntries
          .filter(entry => rawDataKeys.findIndex(key => key === entry[0]) < 0)
          .map(entry => ({
            key: entry[0],
            value: entry[1]
          }))
          .forEach(item => {
            rawData.push(item);
            store.put(item);
          });

        resolve(
          rawData.reduce(
            (acc, data) => Object.assign(acc, { [data.key]: data.value }),
            {}
          ) as NewTabStateBase
        );
      } else {
        const rawDataToAdd = defaultStoreEntries.map(entry => ({
          key: entry[0],
          value: entry[1]
        }));
        rawDataToAdd.forEach(item => store.put(item));

        resolve(defaultStore);
      }
    };
  });
};

/**
 * Асинхронная функция для получения всех данных из хранилища
 * @returns - Начальные данные {@link NewTabStateBase}
 * @category IndexedDB
 */
const getAllAppData = async (): Promise<NewTabStateBase> => {
  const data = await getOrAddAllDBData();

  if (!data.currentLanguage) {
    data.currentLanguage = i18n.language;
  } else if (data.currentLanguage !== i18n.language) {
    await i18n.changeLanguage(data.currentLanguage);
  }

  updateStateWithFeatures(data);

  return data;
};

/**
 * Объект для работы с хранилищем приложения
 * @category IndexedDB
 */
const db: DBModel = {
  set: setAppData,
  getAll: getAllAppData
};

export default db;
