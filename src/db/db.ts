import { NewTabStateBase } from "../models/new-tab-state.model";
import { STORE_NAME, getDBAdapter } from "new-tab-db-adapter";
import { DBModel } from "../models/db.model";
import { updateStateWithFeatures } from "../utils/update.utils";
import defaultStore from "../constants/default-store.constants";
import i18n from "i18next";

/**
 * Адаптер базы данных приложения
 * @category IndexedDB - New Tab
 */
const dbAdapter = getDBAdapter(STORE_NAME);

/**
 * Асинхронная функция для получения всех данных из базы приложения.
 * Недостающие параметры будут заполняться значениями по умолчанию {@link defaultStore}
 * @returns - Данные из базы приложения {@link NewTabStateBase}
 * @category IndexedDB - New Tab
 */
const getOrAddAllDBData = async (): Promise<NewTabStateBase> => {
  const dbItems = await dbAdapter.getAll();
  let result = defaultStore;

  if (dbItems.length) {
    const dataFromDb = dbItems.reduce(
      (acc, data) => Object.assign(acc, { [data.key]: data.value }),
      {}
    );
    const dataToAdd = Object.entries(defaultStore)
      .filter(entry => !dbItems.some(item => item.key === entry[0]))
      .reduce((acc, entry) => Object.assign(acc, { [entry[0]]: entry[1] }), {});
    await dbAdapter.put(dataToAdd);

    result = Object.assign(dataFromDb, dataToAdd) as NewTabStateBase;
  }

  await dbAdapter.put(result);

  return result;
};

/**
 * Асинхронная функция для получения всех данных из базы приложения
 * @returns - Начальные данные {@link NewTabStateBase}
 * @category IndexedDB - New Tab
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
 * Объект для работы с базой данных приложения
 * @category IndexedDB - New Tab
 */
const db: DBModel<NewTabStateBase> = {
  set: dbAdapter.put,
  getAll: getAllAppData
};

export default db;
