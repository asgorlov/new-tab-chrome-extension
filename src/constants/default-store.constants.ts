import { NewTabState } from "../models/new-tab-state.model";
import { MANUAL, SEARCH_ENGINE_NAMES, YANDEX } from "./search-engine.constants";
import { DEFAULT_WALLPAPER } from "./wallpaper.constants";
import i18n from "../localizations/i18n";
import { checkForUpdates, CURRENT_EXT_VERSION } from "./update.constants";

const defaultStore: Readonly<NewTabState> = {
  isDark: false,
  update: {
    lastVersion: CURRENT_EXT_VERSION,
    showMessage: false,
    lastUpdateDate: Date.now()
  },
  darkMode: MANUAL,
  wallpaper: DEFAULT_WALLPAPER,
  nightPeriod: {
    sunset: null,
    sunrise: null
  },
  checkLoading: false,
  searchEngine: YANDEX,
  searchEngines: SEARCH_ENGINE_NAMES,
  currentLanguage: i18n.language,
  checkForUpdates: checkForUpdates.WEEK,
  customWallpaper: null
};

export default defaultStore;
