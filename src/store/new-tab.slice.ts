import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MANUAL, YANDEX } from "../constants/search-engine.constants";
import axios from "axios";
import { Coordinate } from "../models/coordinate.model";
import i18n from "../localizations/i18n";

interface NewTabState {
  sunset?: string | null;
  isDark?: boolean;
  darkMode?: string;
  searchEngine?: string;
  currentLanguage: string;
}

const defaultStorageParameters: NewTabState = {
  sunset: null,
  isDark: false,
  darkMode: MANUAL,
  searchEngine: YANDEX,
  currentLanguage: i18n.language
};

const initialState: NewTabState = {
  currentLanguage: i18n.language
};

export const loadDataFromStorage = createAsyncThunk(
  "chrome/storage/get",
  async () => {
    const data = chrome?.storage
      ? ((await chrome.storage.sync.get(
          defaultStorageParameters
        )) as NewTabState)
      : defaultStorageParameters;

    if (!data.currentLanguage) {
      data.currentLanguage = i18n.language;
    } else if (data.currentLanguage !== i18n.language) {
      await i18n.changeLanguage(data.currentLanguage);
    }

    return data;
  }
);

export const getDarkByLocationTime = createAsyncThunk(
  "api/sunsetAndSunriseTimes/get",
  async (coordinate: Coordinate) => {
    const { data } = await axios.get(
      `https://api.sunrise-sunset.org/json?lat=${coordinate.lat}&lng=${coordinate.lng}&date=today&formatted=0`
    );
    const sunset = new Date(data.results.sunset);
    const now = new Date();

    return {
      sunset: sunset.toString(),
      isDark: sunset.getTime() <= now.getTime()
    };
  }
);

export const changeLanguage = createAsyncThunk(
  "i18n/changeLanguage",
  async (language: string) => {
    if (chrome?.storage) {
      await chrome.storage.sync.set({ currentLanguage: language });
    }

    await i18n.changeLanguage(language);

    return i18n.language;
  }
);

export const newTabSlice = createSlice({
  name: "newTab",
  initialState,
  reducers: {
    setIsDark(state, action) {
      if (chrome?.storage) {
        chrome.storage.sync.set({ isDark: action.payload });
      }

      state.isDark = action.payload;
    },
    setDarkMode(state, action) {
      if (chrome?.storage) {
        chrome.storage.sync.set({ darkMode: action.payload });
      }

      state.darkMode = action.payload;
    },
    setSearchEngine(state, action) {
      if (chrome?.storage) {
        chrome.storage.sync.set({ searchEngine: action.payload });
      }

      state.searchEngine = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(loadDataFromStorage.fulfilled, (state, action) => {
      const { sunset, isDark, darkMode, searchEngine, currentLanguage } =
        action.payload;

      state.sunset = sunset;
      state.isDark = isDark;
      state.darkMode = darkMode;
      state.searchEngine = searchEngine;
      state.currentLanguage = currentLanguage;
    });

    builder.addCase(loadDataFromStorage.rejected, state => {
      state.sunset = defaultStorageParameters.sunset;
      state.isDark = defaultStorageParameters.isDark;
      state.darkMode = defaultStorageParameters.darkMode;
      state.searchEngine = defaultStorageParameters.searchEngine;
      state.currentLanguage = defaultStorageParameters.currentLanguage;
    });

    builder.addCase(getDarkByLocationTime.fulfilled, (state, action) => {
      const { sunset, isDark } = action.payload;
      if (chrome?.storage) {
        chrome.storage.sync.set({ sunset: sunset });
      }

      state.sunset = sunset;
      state.isDark = isDark;
    });

    builder.addCase(getDarkByLocationTime.rejected, state => {
      state.isDark = defaultStorageParameters.isDark;
      state.darkMode = defaultStorageParameters.darkMode;
    });
  }
});

export const selectSunset = (state: RootState) => state.newTab.sunset;
export const selectIsDark = (state: RootState) => state.newTab.isDark;
export const selectDarkMode = (state: RootState) => state.newTab.darkMode;
export const selectSearchEngine = (state: RootState) =>
  state.newTab.searchEngine;
export const selectCurrentLanguage = (state: RootState) =>
  state.newTab.currentLanguage;

export const { setIsDark, setDarkMode, setSearchEngine } = newTabSlice.actions;

export default newTabSlice.reducer;
