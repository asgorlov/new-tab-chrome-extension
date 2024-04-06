import { createSlice } from "@reduxjs/toolkit";
import db from "../../db/db";
import { NewTabState } from "../../models/new-tab-state.model";
import {
  changeLanguage,
  checkUpdates,
  applySettings,
  getWeatherData,
  getExchangeRate
} from "./new-tab.thunks";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { getInitState } from "../../utils/store.utils";
import { Notification } from "../../constants/notification.constants";
import {
  checkForUpdates,
  CURRENT_EXT_VERSION
} from "../../constants/update.constants";
import { SettingsStorage } from "../../models/settings-search.model";
import { NightPeriod } from "../../models/night-period.model";
import { Location } from "../../models/location.model";
import { WidgetName } from "../../constants/widget.constants";
import { Currency } from "../../models/currency.model";

const initialState: NewTabState = await getInitState();

/**
 * Слайс для работы со страничкой <tt>new-tab</tt>
 * @category Slice - New Tab
 */
export const newTabSlice = createSlice({
  name: "newTab",
  initialState,
  reducers: {
    /**
     * Функция изменения флага темного режима
     * @param state - стор
     * @param action - экшн
     */
    setIsDark(state: NewTabState, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
      db.set({ isDark: action.payload });
    },
    /**
     * Функция изменения виджетов
     * @param state - стор
     * @param action - экшн
     */
    setWidgets(state: NewTabState, action: PayloadAction<WidgetName[]>) {
      state.widgets = action.payload;
      db.set({ widgets: action.payload });
    },
    /**
     * Функция изменения флага расположения виджетов на экране
     * @param state - стор
     * @param action - экшн
     */
    setIsWidgetsOnRight(state: NewTabState, action: PayloadAction<boolean>) {
      state.isWidgetsOnRight = action.payload;
      db.set({ isWidgetsOnRight: action.payload });
    },
    /**
     * Функция изменения флага показать ознакомительный тур
     * @param state - стор
     * @param action - экшн
     * */
    setShowTour(state: NewTabState, action: PayloadAction<boolean>) {
      state.showTour = action.payload;
      db.set({ showTour: action.payload });
    },
    /**
     * Функция изменения флага режима включения темного режима
     * @param state - стор
     * @param action - экшн
     */
    setDarkMode(state: NewTabState, action: PayloadAction<string>) {
      state.darkMode = action.payload;
      db.set({ darkMode: action.payload });
    },
    /**
     * Функция изменения флага открытия меню настроек
     * @param state - стор
     * @param action - экшн
     */
    setWallpaper(state: NewTabState, action: PayloadAction<string>) {
      state.wallpaper = action.payload;
      db.set({ wallpaper: action.payload });
    },
    /**
     * Функция изменения ссылки на страницу поисковика SearXNG
     * @param state - стор
     * @param action - экшн
     */
    setSearXngUrl(state: NewTabState, action: PayloadAction<string>) {
      state.searXngUrl = action.payload;
      db.set({ searXngUrl: action.payload });
    },
    /**
     * Функция изменения флага открытия меню настроек
     * @param state - стор
     * @param action - экшн
     */
    setIsOpenMenu(state: NewTabState, action: PayloadAction<boolean>) {
      state.isOpenMenu = action.payload;
    },
    /**
     * Функция изменения периода ночи
     * @param state - стор
     * @param action - экшн
     */
    setNightPeriod(state: NewTabState, action: PayloadAction<NightPeriod>) {
      state.nightPeriod = action.payload;
      db.set({ nightPeriod: action.payload });
    },
    /**
     * Функция изменения текущей поисковой системы
     * @param state - стор
     * @param action - экшн
     */
    setSearchEngine(state: NewTabState, action: PayloadAction<string>) {
      state.searchEngine = action.payload;
      db.set({ searchEngine: action.payload });
    },
    /**
     * Функция добавления нотификации из компонентов
     * @param state - стор
     * @param action - экшн
     */
    addNotifications(
      state: NewTabState,
      action: PayloadAction<Notification | Notification[]>
    ) {
      state.notifications = state.notifications.concat(action.payload);
    },
    /**
     * Функция изменения списка доступный для выбора поисковых систем
     * @param state - стор
     * @param action - экшн
     */
    setSearchEngines(state: NewTabState, action: PayloadAction<string[]>) {
      state.searchEngines = action.payload;
      db.set({ searchEngines: action.payload });
    },
    /**
     * Функция сброса массива нотификаций
     * @param state - стор
     */
    resetNotifications(state: NewTabState) {
      state.notifications = [];
    },
    /**
     * Функция изменения фоновых картинок пользователя
     * @param state - стор
     * @param action - экшн
     */
    setCustomWallpaper(
      state: NewTabState,
      action: PayloadAction<CustomWallpaper | null>
    ) {
      state.customWallpaper = action.payload;
      db.set({ customWallpaper: action.payload });
    },
    /**
     * Функция изменения текущей геолокации пользователя
     * @param state - стор
     * @param action - экшн
     */
    setCurrentLocation(
      state: NewTabState,
      action: PayloadAction<Location | null>
    ) {
      state.currentLocation = action.payload;
      db.set({ currentLocation: action.payload });
    },
    /**
     * Функция изменения режима запросов обновлений
     * @param state - стор
     * @param action - экшн
     */
    setCheckForUpdates(state: NewTabState, action: PayloadAction<string>) {
      state.checkForUpdates = action.payload;
      db.set({ checkForUpdates: action.payload });
    },
    /**
     * Функция изменения списка развернутых настроек
     * @param state - стор
     * @param action - экшн
     */
    setSettingsActiveKeys(
      state: NewTabState,
      action: PayloadAction<SettingsStorage<string | string[]>>
    ) {
      state.settingsActiveKeys = Object.assign(
        { ...state.settingsActiveKeys },
        action.payload
      );
    },
    /**
     * Функция изменения соотношения валюты
     * @param state - стор
     * @param action - экшн
     */
    setCurrencyRatio(state: NewTabState, action: PayloadAction<number>) {
      const mainCurrency = {
        ...state.mainCurrency,
        ratio: action.payload
      };
      state.mainCurrency = mainCurrency;
      db.set({ mainCurrency });
    },
    /**
     * Функция изменения основной валюты
     * @param state - стор
     * @param action - экшн
     */
    setMainCurrency(state: NewTabState, action: PayloadAction<string | null>) {
      const mainCurrency = {
        ...state.mainCurrency,
        selected: action.payload
      };
      state.mainCurrency = mainCurrency;
      db.set({ mainCurrency });
    },
    /**
     * Функция изменения основной валюты по умолчанию
     * @param state - стор
     * @param action - экшн
     */
    setDefaultMainCurrency(state: NewTabState, action: PayloadAction<string>) {
      const mainCurrency = {
        ...state.mainCurrency,
        default: action.payload
      };
      state.mainCurrency = mainCurrency;
      db.set({ mainCurrency });
    },
    /**
     * Функция изменения выбранных валют для конвертации
     * @param state - стор
     * @param action - экшн
     */
    setSelectedCurrencies(
      state: NewTabState,
      action: PayloadAction<Currency[]>
    ) {
      const convertibleCurrencies = {
        ...state.convertibleCurrencies,
        selected: action.payload
      };
      state.convertibleCurrencies = convertibleCurrencies;
      db.set({ convertibleCurrencies });
    }
  },
  extraReducers: builder => {
    builder.addCase(getWeatherData.pending, state => {
      state.weatherLoading = true;
    });

    builder.addCase(getWeatherData.rejected, state => {
      const weather = {
        data: [],
        lastApiCall: new Date().add(30, "min")
      };
      state.weatherLoading = false;
      state.weather = weather;
      db.set({ weather });

      state.notifications = state.notifications.concat(
        Notification.CanNotGetWeatherData
      );
    });

    builder.addCase(getWeatherData.fulfilled, (state, action) => {
      const weather = {
        data: action.payload,
        lastApiCall: new Date()
      };
      state.weatherLoading = false;
      state.weather = weather;
      db.set({ weather });
    });

    builder.addCase(checkUpdates.pending, state => {
      state.checkLoading = true;
    });

    builder.addCase(checkUpdates.rejected, state => {
      state.notifications = state.notifications.concat(
        Notification.CanNotGetUpdateManifest
      );
      state.checkLoading = false;
    });

    builder.addCase(checkUpdates.fulfilled, (state, action) => {
      const update = action.payload;

      if (update.lastVersion === CURRENT_EXT_VERSION) {
        const isManualUpdateRequest =
          state.checkForUpdates === checkForUpdates.MANUAL;
        if (isManualUpdateRequest) {
          state.notifications = state.notifications.concat(
            Notification.NoNewVersion
          );
        }
      } else if (update.lastVersion > CURRENT_EXT_VERSION) {
        state.notifications = state.notifications.concat(
          Notification.HasNewVersion
        );
      }

      state.checkLoading = false;
      state.update.lastVersion = update.lastVersion;
      state.update.lastUpdateDate = update.lastUpdateDate;
      db.set({ update });
    });

    builder.addCase(changeLanguage.fulfilled, (state, action) => {
      state.currentLanguage = action.payload;
    });

    builder.addCase(applySettings.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });

    builder.addCase(getExchangeRate.pending, state => {
      state.currencyLoading = true;
    });

    builder.addCase(getExchangeRate.rejected, state => {
      state.currencyLoading = false;
      state.notifications = state.notifications.concat(
        Notification.CanNotGetExchangeRate
      );
      const convertibleCurrencies = {
        ...state.convertibleCurrencies,
        lastCallApi: new Date()
      };
      state.convertibleCurrencies = convertibleCurrencies;
      db.set({ convertibleCurrencies });
    });

    builder.addCase(getExchangeRate.fulfilled, (state, action) => {
      state.currencyLoading = false;
      const convertibleCurrencies = action.payload;
      state.convertibleCurrencies = convertibleCurrencies;
      db.set({ convertibleCurrencies });
    });
  }
});

export const {
  setIsDark,
  setWidgets,
  setIsWidgetsOnRight,
  setShowTour,
  setDarkMode,
  setWallpaper,
  setSearXngUrl,
  setIsOpenMenu,
  setNightPeriod,
  setSearchEngine,
  addNotifications,
  setSearchEngines,
  resetNotifications,
  setCustomWallpaper,
  setCurrentLocation,
  setCheckForUpdates,
  setSettingsActiveKeys,
  setCurrencyRatio,
  setMainCurrency,
  setDefaultMainCurrency,
  setSelectedCurrencies
} = newTabSlice.actions;

export default newTabSlice.reducer;
