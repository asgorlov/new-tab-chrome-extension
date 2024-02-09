const STORE_NAME = "new-tab-db";
const KEY_PATH_NAME = "key";
const RW_MODE = "readwrite";

const IS_DARK_KEY = "isDark";
const DARK_MODE_KEY = "darkMode";
const NIGHT_PERIOD_KEY = "nightPeriod";
const LOCATION_KEY = "location";
const CHECK_DARK_THEME_TIMEOUT_KEY = "darkThemeCheckTimeout";

const initDB = async dbName => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = () => {
      const database = request.result.objectStoreNames.contains(dbName);

      if (!database) {
        request.result.createObjectStore(dbName, {
          keyPath: KEY_PATH_NAME
        });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = event => reject(event);
  });
};

const getAllValues = async dbName => {
  return new Promise(async resolve => {
    const database = await initDB(dbName);

    try {
      const request = database
        .transaction(dbName, RW_MODE)
        .objectStore(dbName)
        .getAll();

      request.onsuccess = event => resolve(event.currentTarget.result);
    } catch (e) {
      console.error(e);
      resolve([]);
    } finally {
      database.close();
    }
  });
};

const getValue = async (name, dbName) => {
  return new Promise(async resolve => {
    const database = await initDB(dbName);

    try {
      const request = database
        .transaction(dbName, RW_MODE)
        .objectStore(dbName)
        .get(name);

      request.onsuccess = event => resolve(event.currentTarget.result.value);
    } catch (e) {
      console.error(e);
      resolve(undefined);
    } finally {
      database.close();
    }
  });
};

const putValue = async (fields, dbName) => {
  return new Promise(async resolve => {
    const database = await initDB(dbName);
    const transaction = database.transaction(dbName, RW_MODE);
    const store = transaction.objectStore(dbName);

    try {
      Object.entries(fields)
        .map(entry => ({
          key: entry[0],
          value: entry[1]
        }))
        .forEach(item => {
          store.put(item);
        });

      resolve(true);
    } catch (e) {
      console.error(e);
      transaction.abort();
      resolve(false);
    } finally {
      database.close();
    }
  });
};

const getDBAdapter = dbName => {
  return {
    getAll: () => getAllValues(dbName),
    get: name => getValue(name, dbName),
    put: fields => putValue(fields, dbName)
  };
};

export {
  STORE_NAME,
  KEY_PATH_NAME,
  RW_MODE,
  IS_DARK_KEY,
  DARK_MODE_KEY,
  NIGHT_PERIOD_KEY,
  LOCATION_KEY,
  CHECK_DARK_THEME_TIMEOUT_KEY,
  getDBAdapter
};
