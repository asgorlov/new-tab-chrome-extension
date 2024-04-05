import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateModel, UpdateResponseModel } from "../../models/update.model";
import db from "../../db/db";
import i18n from "../../localizations/i18n";
import defaultStore from "../../constants/default-store.constants";
import { NewTabState, NewTabStateBase } from "../../models/new-tab-state.model";
import { fetchWeatherApi } from "openmeteo";
import { Location } from "../../models/location.model";
import {
  HourlyWeatherDataForDay,
  WMOCodeType
} from "../../models/weather.model";
import { CURRENCIES_OF_COUNTRIES } from "../../constants/currency.constants";
import {
  GettingExchangeRateParams,
  Currency
} from "../../models/currency.model";

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

/**
 * Асинхронный запрос данных виджета погоды
 * @category Thunks - New Tab
 */
export const getWeatherData = createAsyncThunk(
  "api/weather/get",
  async (location: Location): Promise<HourlyWeatherDataForDay[]> => {
    const params = {
      latitude: location.latitude,
      longitude: location.longitude,
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "weather_code",
        "surface_pressure",
        "wind_speed_10m",
        "wind_direction_10m"
      ],
      wind_speed_unit: "ms",
      timezone: "auto",
      forecast_days: 1
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;
    const formTimeRanges = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const weatherRawData = {
      hourly: {
        time: formTimeRanges(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        weatherCode: hourly.variables(2)!.valuesArray()!,
        surfacePressure: hourly.variables(3)!.valuesArray()!,
        windSpeed10m: hourly.variables(4)!.valuesArray()!,
        windDirection10m: hourly.variables(5)!.valuesArray()!
      }
    };

    const result: HourlyWeatherDataForDay[] = [];
    for (let i = 0; i < weatherRawData.hourly.time.length; i++) {
      result.push({
        time: weatherRawData.hourly.time[i],
        temp: weatherRawData.hourly.temperature2m[i],
        humidity: weatherRawData.hourly.relativeHumidity2m[i],
        weatherCode: weatherRawData.hourly.weatherCode[i] as WMOCodeType,
        pressure: weatherRawData.hourly.surfacePressure[i],
        windSpeed: weatherRawData.hourly.windSpeed10m[i],
        windDirection: weatherRawData.hourly.windDirection10m[i]
      });
    }

    return result;
  }
);

/**
 * Асинхронный запрос получения валют для конвертации
 * @category Thunks - New Tab
 */
export const getAvailableConvertibleCurrencies = createAsyncThunk(
  "api/available-convertible-currencies/get",
  async (): Promise<string[]> => {
    const { data } = await axios.get<Record<string, string>>(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
    );
    const uniqueCurrencyCodes = new Set(Object.values(CURRENCIES_OF_COUNTRIES));

    return Object.entries(data)
      .map(e => e[0].toUpperCase())
      .filter(code => uniqueCurrencyCodes.has(code));
  }
);

/**
 * Асинхронный запрос получения курса валют
 * @category Thunks - New Tab
 */
export const getExchangeRate = createAsyncThunk(
  "api/exchange-rate/get",
  async (params: GettingExchangeRateParams): Promise<Currency[]> => {
    const { mainCurrency, selectedCurrencies } = params;
    const { data } = await axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${mainCurrency.code}.json`
    );
    const exchangeRates = data[mainCurrency.code.toLowerCase()];

    return selectedCurrencies.map(c => ({
      code: c.code,
      rate: exchangeRates[c.code.toLowerCase()]
    }));
  }
);
