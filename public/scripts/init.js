import "./sun-calc/index.js";
import { STORE_NAME, initDB, RW_MODE } from "./init-db/index";

// Скорость загрузки данного скрипта на странице быстрее, чем через ts + webpack
const initBackground = async () => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, RW_MODE);
  const store = transaction.objectStore(STORE_NAME);

  store.get("isDark").onsuccess = event => {
    document.body.style.backgroundColor = event.currentTarget.result.value
      ? "#292c35"
      : "#fff";
  };
};

// данные работают в фоне, но нужно сделать обсервер для изменения таблицы.
// indexedDB не имееет такого, но есть в vlcn.io и в chrome базе
// Решение: отправка сообщений от сервис воркера если что-то поменялось к клиенту

// если использовать indexedDB, то можно хранить несериализуемые данные, например картинки
navigator?.serviceWorker
  .register("./sw.js")
  .then(() =>
    navigator.serviceWorker.ready.then(worker => {
      worker.sync.register("syncdata");
    })
  )
  .catch(err => console.error(err));

await initBackground();
