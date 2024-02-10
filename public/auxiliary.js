import {
  getDBAdapter,
  IS_DARK_KEY,
  STORE_NAME
} from "./scripts/new-tab-db-adapter/index.js";

// Текущий скрипт отрабатывает быстрее, чем основной
const initBackground = async () => {
  const db = getDBAdapter(STORE_NAME);
  const isDark = await db.get(IS_DARK_KEY);
  document.body.style.backgroundColor = isDark ? "#292c35" : "#fff";
};

await initBackground();
