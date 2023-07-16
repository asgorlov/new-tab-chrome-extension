import { NewTabState } from "../models/new-tab-state.model";
import manifest from "../../public/manifest.json";
import { MANUAL, SEARCH_ENGINE_NAMES, YANDEX } from "./search-engine.constants";
import { DEFAULT_WALLPAPER } from "./wallpaper.constants";
import i18n from "../localizations/i18n";
import { checkForUpdates } from "./check-for-updates.constants";

const defaultStore: Readonly<NewTabState> = {
  isDark: false,
  update: {
    lastVersion: manifest.version,
    showMessage: false,
    lastUpdateDate: Date.now()
  },
  darkMode: MANUAL,
  wallpaper: DEFAULT_WALLPAPER,
  nightPeriod: {
    sunset: null,
    sunrise: null
  },
  searchEngine: YANDEX,
  searchEngines: SEARCH_ENGINE_NAMES,
  currentLanguage: i18n.language,
  checkForUpdates: checkForUpdates.WEEK,
  customWallpaper: null
};

export default defaultStore;
