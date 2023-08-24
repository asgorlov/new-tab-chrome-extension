import { createSlice } from "@reduxjs/toolkit";
import {
  getInitStateFromChrome,
  setDataToChromeLocalStorage,
  setDataToChromeSyncStorage
} from "../../utils/chrome.utils";
import { NewTabState } from "../../models/new-tab-state.model";
import {
  changeLanguage,
  checkUpdates,
  getNightPeriodByLocation,
  resetSettings
} from "./new-tab.thunks";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";

const initialState: NewTabState = await getInitStateFromChrome();

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
     * */
    setIsDark(state: NewTabState, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
      setDataToChromeSyncStorage({ isDark: action.payload });
    },
    /**
     * Функция изменения флага показать ознакомительный тур
     * */
    setShowTour(state: NewTabState, action: PayloadAction<boolean>) {
      state.showTour = action.payload;
      setDataToChromeLocalStorage({ showTour: action.payload });
    },
    /**
     * Функция изменения флага режима включения темного режима
     */
    setDarkMode(state: NewTabState, action: PayloadAction<string>) {
      state.darkMode = action.payload;
      setDataToChromeSyncStorage({ darkMode: action.payload });
    },
    /**
     * Функция изменения флага открытия меню настроек
     */
    setWallpaper(state: NewTabState, action: PayloadAction<string>) {
      state.wallpaper = action.payload;
      setDataToChromeSyncStorage({ wallpaper: action.payload });
    },
    /**
     * Функция изменения флага открытия меню настроек
     */
    setIsOpenMenu(state: NewTabState, action: PayloadAction<boolean>) {
      state.isOpenMenu = action.payload;
    },
    /**
     * Функция изменения текущей поисковой системы
     */
    setSearchEngine(state: NewTabState, action: PayloadAction<string>) {
      state.searchEngine = action.payload;
      setDataToChromeSyncStorage({ searchEngine: action.payload });
    },
    /**
     * Функция изменения списка доступный для выбора поисковых систем
     */
    setSearchEngines(state: NewTabState, action: PayloadAction<string[]>) {
      state.searchEngines = action.payload;
      setDataToChromeSyncStorage({ searchEngines: action.payload });
    },
    /**
     * Функция изменения фоновых картинок пользователя
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
     */
    setCheckForUpdates(state: NewTabState, action: PayloadAction<string>) {
      state.checkForUpdates = action.payload;
      setDataToChromeSyncStorage({ checkForUpdates: action.payload });
    },
    /**
     * Функция изменения флага показа окна с новой версией приложения
     */
    setShowUpdateMessage(state: NewTabState, action: PayloadAction<boolean>) {
      state.update.showMessage = action.payload;
      setDataToChromeSyncStorage({ update: state.update });
    }
  },
  extraReducers: builder => {
    builder.addCase(checkUpdates.pending, state => {
      state.checkLoading = true;
    });

    builder.addCase(checkUpdates.rejected, state => {
      state.checkLoading = false;
    });

    builder.addCase(checkUpdates.fulfilled, (state, action) => {
      const { lastUpdateDate, showMessage, lastVersion } = action.payload;

      state.checkLoading = false;
      state.update.showMessage = showMessage;
      state.update.lastVersion = lastVersion;
      state.update.lastUpdateDate = lastUpdateDate;
      setDataToChromeSyncStorage({ update: state.update });
    });

    builder.addCase(changeLanguage.fulfilled, (state, action) => {
      state.currentLanguage = action.payload;
    });

    builder.addCase(resetSettings.fulfilled, (state, action) => {
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
  setCustomWallpaper,
  setCheckForUpdates,
  setShowUpdateMessage
} = newTabSlice.actions;

export default newTabSlice.reducer;
