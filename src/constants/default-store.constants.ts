import { NewTabStateBase } from "../models/new-tab-state.model";
import { MANUAL, SEARCH_ENGINE_NAMES, YANDEX } from "./search-engine.constants";
import { DEFAULT_WALLPAPER } from "./wallpaper.constants";
import i18n from "../localizations/i18n";
import { checkForUpdates, CURRENT_EXT_VERSION } from "./update.constants";

/**
 * Значения стейта по умолчанию
 * @category Constants - Default Store
 */
const defaultStore: Readonly<NewTabStateBase> = {
  isDark: false,
  update: {
    lastVersion: CURRENT_EXT_VERSION,
    lastUpdateDate: Date.now()
  },
  widgets: [],
  widgetsOnRight: false,
  showTour: true,
  darkMode: MANUAL,
  wallpaper: DEFAULT_WALLPAPER,
  searXngUrl: "",
  nightPeriod: {
    sunset: null,
    sunrise: null
  },
  checkLoading: false,
  searchEngine: YANDEX,
  searchEngines: SEARCH_ENGINE_NAMES,
  currentLanguage: i18n.language,
  checkForUpdates: checkForUpdates.WEEK,
  customWallpaper: null,
  currentLocation: null
};

export default defaultStore;
