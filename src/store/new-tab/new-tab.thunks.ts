import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinate } from "../../models/coordinate.model";
import { NightPeriod } from "../../models/night-period.model";
import axios from "axios";
import { UpdateModel, UpdateResponseModel } from "../../models/update.model";
import db from "../../db/db";
import i18n from "../../localizations/i18n";
import defaultStore from "../../constants/default-store.constants";
import { NewTabState, NewTabStateBase } from "../../models/new-tab-state.model";

/**
 * Асинхронный запрос для получения периода ночи указанной локации
 * @category Thunks - New Tab
 */
export const getNightPeriodByLocation = createAsyncThunk(
  "api/sunsetAndSunriseTimes/get",
  async (coordinate: Coordinate): Promise<NightPeriod> => {
    const { data } = await axios.get("https://api.sunrise-sunset.org/json", {
      params: {
        lat: coordinate.lat,
        lng: coordinate.lng,
        date: "today",
        formatted: 0
      }
    });

    return {
      sunset: new Date(data.results.sunset).toString(),
      sunrise: new Date(data.results.sunrise).toString()
    };
  }
);

/**
 * Асинхронный запрос для получения обновлений
 * @category Thunks - New Tab
 */
export const checkUpdates = createAsyncThunk(
  "api/manifest/get",
  async (): Promise<UpdateModel> => {
    const { data } = await axios.get<UpdateResponseModel>(
      "https://raw.githubusercontent.com/asgorlov/new-tab-chrome-extension/main/public/manifest.json"
    );

    return {
      lastVersion: data.version,
      lastUpdateDate: Date.now()
    };
  }
);

/**
 * Асинхронный запрос для смены языка
 * @category Thunks - New Tab
 */
export const changeLanguage = createAsyncThunk(
  "i18n/changeLanguage",
  async (language: string): Promise<string> => {
    db.set({ currentLanguage: language });
    await i18n.changeLanguage(language);

    return language;
  }
);

/**
 * Асинхронный запрос изменения или сброса настроек
 * @category Thunks - New Tab
 */
export const applySettings = createAsyncThunk(
  "newTab/applySettings",
  async (
    settings: NewTabStateBase | null,
    { getState }
  ): Promise<NewTabState> => {
    const state = getState() as NewTabState;
    const data: NewTabState = Object.assign(
      { ...state },
      settings ?? defaultStore
    );

    if (!settings) {
      data.update.previousVersion = data.update.lastVersion;

      if (navigator.language) {
        data.currentLanguage = navigator.language;
      }
    }

    db.set(data);
    await i18n.changeLanguage(data.currentLanguage);

    return data;
  }
);
