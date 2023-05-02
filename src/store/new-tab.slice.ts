import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MANUAL, YANDEX } from "../constants/search-engine.constants";
import axios from "axios";
import { Coordinate } from "../models/coordinate.model";

interface NewTabState {
  isDark?: boolean;
  darkMode?: string;
  searchEngine?: string;
  sunset?: string | null;
}

const defaultStorageParameters = {
  isDark: false,
  darkMode: MANUAL,
  searchEngine: YANDEX,
  sunset: null
};

const initialState: NewTabState = {};

export const loadDataFromStorage = createAsyncThunk(
  "chrome/storage/get",
  async () => {
    return chrome?.storage
      ? chrome.storage.sync.get(defaultStorageParameters)
      : defaultStorageParameters;
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
      const { isDark, darkMode, searchEngine, sunset } = action.payload;
      state.isDark = isDark;
      state.darkMode = darkMode;
      state.searchEngine = searchEngine;
      state.sunset = sunset;
    });

    builder.addCase(loadDataFromStorage.rejected, state => {
      state.isDark = defaultStorageParameters.isDark;
      state.darkMode = defaultStorageParameters.darkMode;
      state.searchEngine = defaultStorageParameters.searchEngine;
    });

    builder.addCase(getDarkByLocationTime.fulfilled, (state, action) => {
      const { sunset, isDark } = action.payload;
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

export const { setIsDark, setDarkMode, setSearchEngine } = newTabSlice.actions;

export default newTabSlice.reducer;
