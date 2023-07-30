import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { Coordinate } from "../models/coordinate.model";
import i18n from "../localizations/i18n";
import {
  getInitStateFromChrome,
  setDataToChromeLocalStorage,
  setDataToChromeSyncStorage
} from "../utils/chrome.utils";
import { NewTabState } from "../models/new-tab-state.model";
import { UpdateModel, UpdateResponseModel } from "../models/update.model";
import { CustomWallpaper } from "../models/custom-wallpaper.model";
import defaultStore from "../constants/default-store.constants";
import { NightPeriod } from "../models/night-period.model";
import { CURRENT_EXT_VERSION } from "../constants/update.constants";

const initialState: NewTabState = await getInitStateFromChrome();

export const getNightPeriodByLocation = createAsyncThunk(
  "api/sunsetAndSunriseTimes/get",
  async (coordinate: Coordinate): Promise<NightPeriod> => {
    const { data } = await axios.get(
      `https://api.sunrise-sunset.org/json?lat=${coordinate.lat}&lng=${coordinate.lng}&date=today&formatted=0`
    );

    return {
      sunset: new Date(data.results.sunset).toString(),
      sunrise: new Date(data.results.sunrise).toString()
    };
  }
);

export const checkUpdates = createAsyncThunk(
  "api/manifest/get",
  async (): Promise<UpdateModel> => {
    const { data } = await axios.get<UpdateResponseModel>(
      "https://raw.githubusercontent.com/asgorlov/new-tab-chrome-extension/main/public/manifest.json"
    );

    return {
      lastVersion: data.version,
      showMessage: data.version > CURRENT_EXT_VERSION,
      lastUpdateDate: Date.now()
    };
  }
);

export const changeLanguage = createAsyncThunk(
  "i18n/changeLanguage",
  async (language: string): Promise<string> => {
    setDataToChromeSyncStorage({ currentLanguage: language });
    await i18n.changeLanguage(language);

    return language;
  }
);

export const resetSettings = createAsyncThunk(
  "newTab/resetSettings",
  async () => {
    const data = defaultStore as NewTabState;

    data.update.previousVersion = data.update.lastVersion;

    if (navigator.language) {
      data.currentLanguage = navigator.language;
    }

    setDataToChromeSyncStorage(data);
    setDataToChromeLocalStorage({ customWallpaper: data.customWallpaper });
    await i18n.changeLanguage(data.currentLanguage);

    return data;
  }
);

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

export const selectIsDark = (state: RootState): boolean => state.newTab.isDark;
export const selectShowTour = (state: RootState): boolean =>
  state.newTab.showTour;
export const selectDarkMode = (state: RootState): string =>
  state.newTab.darkMode;
export const selectWallpaper = (state: RootState): string =>
  state.newTab.wallpaper;
export const selectIsOpenMenu = (state: RootState): boolean =>
  !!state.newTab.isOpenMenu;
export const selectNightPeriod = (state: RootState): NightPeriod =>
  state.newTab.nightPeriod;
export const selectLastVersion = (state: RootState): string =>
  state.newTab.update.lastVersion;
export const selectCheckLoading = (state: RootState): boolean =>
  state.newTab.checkLoading;
export const selectSearchEngine = (state: RootState): string =>
  state.newTab.searchEngine;
export const selectSearchEngines = (state: RootState): string[] =>
  state.newTab.searchEngines;
export const selectLastUpdateDate = (state: RootState): number =>
  state.newTab.update.lastUpdateDate;
export const selectCheckForUpdates = (state: RootState): string =>
  state.newTab.checkForUpdates;
export const selectCurrentLanguage = (state: RootState): string =>
  state.newTab.currentLanguage;
export const selectCustomWallpaper = (
  state: RootState
): CustomWallpaper | null => state.newTab.customWallpaper;
export const selectShowUpdateMessage = (state: RootState): boolean =>
  state.newTab.update.showMessage;
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
