import { createSlice } from "@reduxjs/toolkit";
import {
  setDataToChromeLocalStorage,
  setDataToChromeSyncStorage
} from "../../utils/chrome.utils";
import { NewTabState } from "../../models/new-tab-state.model";
import {
  changeLanguage,
  checkUpdates,
  getNightPeriodByLocation,
  applySettings
} from "./new-tab.thunks";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { getInitState } from "../../utils/store.utils";
import { Notification } from "../../constants/notification.constants";
import { CURRENT_EXT_VERSION } from "../../constants/update.constants";
import { SettingsStorage } from "../../models/settings-search.model";

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
      setDataToChromeSyncStorage({ isDark: action.payload });
    },
    /**
     * Функция изменения флага показать ознакомительный тур
     * @param state - стор
     * @param action - экшн
     * */
    setShowTour(state: NewTabState, action: PayloadAction<boolean>) {
      state.showTour = action.payload;
      setDataToChromeLocalStorage({ showTour: action.payload });
    },
    /**
     * Функция изменения флага режима включения темного режима
     * @param state - стор
     * @param action - экшн
     */
    setDarkMode(state: NewTabState, action: PayloadAction<string>) {
      state.darkMode = action.payload;
      setDataToChromeSyncStorage({ darkMode: action.payload });
    },
    /**
     * Функция изменения флага открытия меню настроек
     * @param state - стор
     * @param action - экшн
     */
    setWallpaper(state: NewTabState, action: PayloadAction<string>) {
      state.wallpaper = action.payload;
      setDataToChromeSyncStorage({ wallpaper: action.payload });
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
     * Функция изменения текущей поисковой системы
     * @param state - стор
     * @param action - экшн
     */
    setSearchEngine(state: NewTabState, action: PayloadAction<string>) {
      state.searchEngine = action.payload;
      setDataToChromeSyncStorage({ searchEngine: action.payload });
    },
    /**
     * Функция изменения списка доступный для выбора поисковых систем
     * @param state - стор
     * @param action - экшн
     */
    setSearchEngines(state: NewTabState, action: PayloadAction<string[]>) {
      state.searchEngines = action.payload;
      setDataToChromeSyncStorage({ searchEngines: action.payload });
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
      setDataToChromeLocalStorage({ customWallpaper: action.payload });
    },
    /**
     * Функция изменения режима запросов обновлений
     * @param state - стор
     * @param action - экшн
     */
    setCheckForUpdates(state: NewTabState, action: PayloadAction<string>) {
      state.checkForUpdates = action.payload;
      setDataToChromeSyncStorage({ checkForUpdates: action.payload });
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
        {},
        state.settingsActiveKeys,
        action.payload
      );
    }
  },
  extraReducers: builder => {
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
      const { lastUpdateDate, lastVersion } = action.payload;

      if (lastVersion === CURRENT_EXT_VERSION) {
        state.notifications = state.notifications.concat(
          Notification.NoNewVersion
        );
      } else if (lastVersion > CURRENT_EXT_VERSION) {
        state.notifications = state.notifications.concat(
          Notification.HasNewVersion
        );
      }

      state.checkLoading = false;
      state.update.lastVersion = lastVersion;
      state.update.lastUpdateDate = lastUpdateDate;
      setDataToChromeSyncStorage({ update: state.update });
    });

    builder.addCase(changeLanguage.fulfilled, (state, action) => {
      state.currentLanguage = action.payload;
    });

    builder.addCase(applySettings.fulfilled, (state, action) => {
      const {
        isDark,
        update,
        darkMode,
        wallpaper,
        nightPeriod,
        searchEngine,
        searchEngines,
        currentLanguage,
        checkForUpdates,
        customWallpaper
      } = action.payload;

      state.isDark = isDark;
      state.update = update;
      state.darkMode = darkMode;
      state.wallpaper = wallpaper;
      state.nightPeriod = nightPeriod;
      state.searchEngine = searchEngine;
      state.searchEngines = searchEngines;
      state.currentLanguage = currentLanguage;
      state.checkForUpdates = checkForUpdates;
      state.customWallpaper = customWallpaper;
    });

    builder.addCase(getNightPeriodByLocation.rejected, state => {
      state.notifications = state.notifications.concat(
        Notification.CanNotGetNightPeriod
      );
    });

    builder.addCase(getNightPeriodByLocation.fulfilled, (state, action) => {
      state.nightPeriod = action.payload;
      setDataToChromeSyncStorage({ nightPeriod: action.payload });
    });
  }
});

export const {
  setIsDark,
  setShowTour,
  setDarkMode,
  setWallpaper,
  setIsOpenMenu,
  setSearchEngine,
  setSearchEngines,
  resetNotifications,
  setCustomWallpaper,
  setCheckForUpdates,
  setSettingsActiveKeys
} = newTabSlice.actions;

export default newTabSlice.reducer;
