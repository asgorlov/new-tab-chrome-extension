import { NewTabStateBase } from "../models/new-tab-state.model";
import { MANUAL, SEARCH_ENGINE_NAMES, YANDEX } from "./search-engine.constants";
import { DEFAULT_WALLPAPER } from "./wallpaper.constants";
import i18n from "../localizations/i18n";
import { checkForUpdates, CURRENT_EXT_VERSION } from "./update.constants";
import { WidgetName } from "./widget.constants";
import {
  DEFAULT_CURRENCY,
  DEFAULT_SELECTABLE_CURRENCIES
} from "./currency.constants";

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
  widgets: Object.values(WidgetName),
  isWidgetsOnRight: false,
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
  currentLocation: null,
  weather: {
    data: [],
    lastApiCall: null
  },
  convertibleCurrencies: {
    selected: DEFAULT_SELECTABLE_CURRENCIES,
    available: DEFAULT_SELECTABLE_CURRENCIES.map(c => c.code)
  },
  mainCurrency: {
    selected: null,
    default: DEFAULT_CURRENCY
  }
};

export default defaultStore;
