import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { Coordinate } from "../models/coordinate.model";
import i18n from "../localizations/i18n";
import {
  defaultStorageParameters,
  getInitStateFromChrome,
  isUpdateRequired,
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
  async (_, thunkAPI): Promise<UpdateModel> => {
    const now = new Date();
    const state = thunkAPI.getState() as RootState;
    const updateRequestDate = new Date(state.newTab.update.requestDate);
    const updateRequestRequired =
      now.toDateString() !== updateRequestDate.toDateString();

    if (updateRequestRequired) {
      const { data } = await axios.get<UpdateResponseModel>(
        "https://raw.githubusercontent.com/asgorlov/new-tab-chrome-extension/main/public/manifest.json"
      );

      return {
        showMessage: await isUpdateRequired(data.version),
        requestDate: now.getMilliseconds()
      };
    }

    return {
      showMessage: false,
      requestDate: updateRequestDate.getMilliseconds()
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
      setDataToChrome({ isDark: action.payload });
      state.isDark = action.payload;
    },
    setDarkMode(state, action) {
      setDataToChrome({ darkMode: action.payload });
      state.darkMode = action.payload;
    },
    setSearchEngine(state, action) {
      setDataToChrome({ searchEngine: action.payload });
      state.searchEngine = action.payload;
    },
    setSearchEngines(state, action) {
      setDataToChrome({ searchEngines: action.payload });
      state.searchEngines = action.payload;
    },
    setCheckForUpdates(state, action) {
      setDataToChrome({ checkForUpdates: action.payload });
      state.checkForUpdates = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(checkUpdates.fulfilled, (state, action) => {
      state.update = action.payload;
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
      setDataToChrome({ sunset: action.payload });
      state.sunset = action.payload;
    });
  }
});

export const selectSunset = (state: RootState) => state.newTab.sunset;
export const selectIsDark = (state: RootState) => state.newTab.isDark;
export const selectDarkMode = (state: RootState) => state.newTab.darkMode;
export const selectSearchEngine = (state: RootState) =>
  state.newTab.searchEngine;
export const selectSearchEngines = (state: RootState) =>
  state.newTab.searchEngines;
export const selectCheckForUpdates = (state: RootState) =>
  state.newTab.checkForUpdates;
export const selectCurrentLanguage = (state: RootState) =>
  state.newTab.currentLanguage;
export const selectShowUpdateMessage = (state: RootState) =>
  state.newTab.update.showMessage;

export const {
  setIsDark,
  setDarkMode,
  setSearchEngine,
  setSearchEngines,
  setCheckForUpdates
} = newTabSlice.actions;

export default newTabSlice.reducer;
