import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { Coordinate } from "../models/coordinate.model";
import i18n from "../localizations/i18n";
import {
  defaultStorageParameters,
  getInitStateFromChrome,
  setDataToChrome
} from "../utils/chrome-storage.utils";
import { NewTabState } from "../models/new-tab-state.model";
import { UpdateModel, UpdateResponseModel } from "../models/update.model";

const initialState: NewTabState = await getInitStateFromChrome();

export const getSunsetTimeByLocation = createAsyncThunk(
  "api/sunsetAndSunriseTimes/get",
  async (coordinate: Coordinate): Promise<string> => {
    const { data } = await axios.get(
      `https://api.sunrise-sunset.org/json?lat=${coordinate.lat}&lng=${coordinate.lng}&date=today&formatted=0`
    );
    const sunset = new Date(data.results.sunset);

    return sunset.toString();
  }
);

export const checkUpdates = createAsyncThunk(
  "api/manifest/get",
  async (lastUpdateDate: number, thunkAPI): Promise<UpdateModel> => {
    const state = thunkAPI.getState() as RootState;
    const lastVersion = state.newTab.update.lastVersion;

    const { data } = await axios.get<UpdateResponseModel>(
      "https://raw.githubusercontent.com/asgorlov/new-tab-chrome-extension/main/public/manifest.json"
    );

    return {
      lastVersion: data.version,
      showMessage: data.version > lastVersion,
      lastUpdateDate: lastUpdateDate
    };
  }
);

export const changeLanguage = createAsyncThunk(
  "i18n/changeLanguage",
  async (language: string): Promise<string> => {
    setDataToChrome({ currentLanguage: language });
    await i18n.changeLanguage(language);

    return language;
  }
);

export const resetSettings = createAsyncThunk(
  "newTab/resetSettings",
  async () => {
    const data = defaultStorageParameters as NewTabState;

    if (navigator.language) {
      data.currentLanguage = navigator.language;
    }

    setDataToChrome(data);
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
      setDataToChrome({ isDark: action.payload });
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
      setDataToChrome({ darkMode: action.payload });
    },
    setSearchEngine(state, action) {
      state.searchEngine = action.payload;
      setDataToChrome({ searchEngine: action.payload });
    },
    setSearchEngines(state, action) {
      state.searchEngines = action.payload;
      setDataToChrome({ searchEngines: action.payload });
    },
    setCheckForUpdates(state, action) {
      state.checkForUpdates = action.payload;
      setDataToChrome({ checkForUpdates: action.payload });
    },
    setShowUpdateMessage(state, action) {
      state.update.showMessage = action.payload;
      setDataToChrome({ update: state.update });
    }
  },
  extraReducers: builder => {
    builder.addCase(checkUpdates.fulfilled, (state, action) => {
      const { lastUpdateDate, showMessage, lastVersion } = action.payload;

      state.update.showMessage = showMessage;
      state.update.lastVersion = lastVersion;
      state.update.lastUpdateDate = lastUpdateDate;
      setDataToChrome({ update: state.update });
    });

    builder.addCase(changeLanguage.fulfilled, (state, action) => {
      state.currentLanguage = action.payload;
    });

    builder.addCase(resetSettings.fulfilled, (state, action) => {
      const {
        sunset,
        isDark,
        darkMode,
        searchEngine,
        searchEngines,
        currentLanguage
      } = action.payload;

      state.sunset = sunset;
      state.isDark = isDark;
      state.darkMode = darkMode;
      state.searchEngine = searchEngine;
      state.searchEngines = searchEngines;
      state.currentLanguage = currentLanguage;
    });

    builder.addCase(getSunsetTimeByLocation.fulfilled, (state, action) => {
      state.sunset = action.payload;
      setDataToChrome({ sunset: action.payload });
    });
  }
});

export const selectSunset = (state: RootState): string | null =>
  state.newTab.sunset;
export const selectIsDark = (state: RootState): boolean => state.newTab.isDark;
export const selectDarkMode = (state: RootState): string =>
  state.newTab.darkMode;
export const selectLastVersion = (state: RootState): string =>
  state.newTab.update.lastVersion;
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
export const selectShowUpdateMessage = (state: RootState): boolean =>
  state.newTab.update.showMessage;

export const {
  setIsDark,
  setDarkMode,
  setSearchEngine,
  setSearchEngines,
  setCheckForUpdates,
  setShowUpdateMessage
} = newTabSlice.actions;

export default newTabSlice.reducer;
