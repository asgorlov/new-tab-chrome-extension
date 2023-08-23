import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinate } from "../../models/coordinate.model";
import { NightPeriod } from "../../models/night-period.model";
import axios from "axios";
import { UpdateModel, UpdateResponseModel } from "../../models/update.model";
import { CURRENT_EXT_VERSION } from "../../constants/update.constants";
import {
  setDataToChromeLocalStorage,
  setDataToChromeSyncStorage
} from "../../utils/chrome.utils";
import i18n from "../../localizations/i18n";
import defaultStore from "../../constants/default-store.constants";
import { NewTabState } from "../../models/new-tab-state.model";

/**
 * Асинхронный запрос для получения периода ночи указанной локации
 * @category New Tab Thunks
 */
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

/**
 * Асинхронный запрос для получения обновлений
 * @category New Tab Thunks
 */
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

/**
 * Асинхронный запрос для смены языка
 * @category New Tab Thunks
 */
export const changeLanguage = createAsyncThunk(
  "i18n/changeLanguage",
  async (language: string): Promise<string> => {
    setDataToChromeSyncStorage({ currentLanguage: language });
    await i18n.changeLanguage(language);

    return language;
  }
);

/**
 * Асинхронный запрос сброса настроек
 * @category New Tab Thunks
 */
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
