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

const initialState: NewTabState = await getInitStateFromChrome();

/**
 * Слайс для работы со страничкой <tt>new-tab</tt>
 * @category Slice - New Tab
 */
export const newTabSlice = createSlice({
  name: "newTab",
  initialState,
  reducers: {
    setIsDark(state, action) {
      state.isDark = action.payload;
      setDataToChromeSyncStorage({ isDark: action.payload });
    },
    setShowTour(state, action) {
      state.showTour = action.payload;
      setDataToChromeLocalStorage({ showTour: action.payload });
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
      setDataToChromeSyncStorage({ darkMode: action.payload });
    },
    setWallpaper(state, action) {
      state.wallpaper = action.payload;
      setDataToChromeSyncStorage({ wallpaper: action.payload });
    },
    setIsOpenMenu(state, action) {
      state.isOpenMenu = action.payload;
    },
    setSearchEngine(state, action) {
      state.searchEngine = action.payload;
      setDataToChromeSyncStorage({ searchEngine: action.payload });
    },
    setSearchEngines(state, action) {
      state.searchEngines = action.payload;
      setDataToChromeSyncStorage({ searchEngines: action.payload });
    },
    setCustomWallpaper(state, action) {
      state.customWallpaper = action.payload;
      setDataToChromeLocalStorage({ customWallpaper: action.payload });
    },
    setCheckForUpdates(state, action) {
      state.checkForUpdates = action.payload;
      setDataToChromeSyncStorage({ checkForUpdates: action.payload });
    },
    setShowUpdateMessage(state, action) {
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
  /**
   * Функция изменения флага темного режима
   * @category Slice - New Tab
   */
  setIsDark,
  /**
   * Функция изменения флага показать ознакомительный тур
   * @category Slice - New Tab
   */
  setShowTour,
  /**
   * Функция изменения флага режима включения темного режима
   * @category Slice - New Tab
   */
  setDarkMode,
  /**
   * Функция изменения имени фоновых картинок
   * @category Slice - New Tab
   */
  setWallpaper,
  /**
   * Функция изменения флага открытия меню настроек
   * @category Slice - New Tab
   */
  setIsOpenMenu,
  /**
   * Функция изменения текущей поисковой системы
   * @category Slice - New Tab
   */
  setSearchEngine,
  /**
   * Функция изменения списка доступный для выбора поисковых систем
   * @category Slice - New Tab
   */
  setSearchEngines,
  /**
   * Функция изменения фоновых картинок пользователя
   * @category Slice - New Tab
   */
  setCustomWallpaper,
  /**
   * Функция изменения режима запросов обновлений
   * @category Slice - New Tab
   */
  setCheckForUpdates,
  /**
   * Функция изменения флага показа окна с новой версией приложения
   * @category Slice - New Tab
   */
  setShowUpdateMessage
} = newTabSlice.actions;

export default newTabSlice.reducer;
