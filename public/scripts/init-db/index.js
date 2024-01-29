export const STORE_NAME = "new-tab-db";
export const KEY_PATH_NAME = "key";
export const RW_MODE = "readwrite";

export const initDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(STORE_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: KEY_PATH_NAME });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = event => reject(event);
  });
};
