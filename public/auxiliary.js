import "./scripts/dark-theme-util/index.js";
import {
  IS_DARK_KEY,
  getDBAdapter,
  STORE_NAME
} from "./scripts/new-tab-db-adapter/index.js";

// const initServiceWorker = () => {
//   navigator?.serviceWorker
//     .register("./background.js", { type: "module" })
//     .catch(error => console.error(error));
// };

const initBackground = async () => {
  const db = getDBAdapter(STORE_NAME);
  const isDark = await db.get(IS_DARK_KEY);
  document.body.style.backgroundColor = isDark ? "#292c35" : "#fff";
};

// initServiceWorker();
await initBackground();
