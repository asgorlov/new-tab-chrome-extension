import { Location } from "../models/location.model";
import coordinateToCountry from "coordinate_to_country";
import {
  COUNTRIES_OF_CURRENCIES,
  CURRENCIES_OF_COUNTRIES,
  CURRENCY_UPDATING_PERIOD_IN_HOURS,
  DEFAULT_CURRENCY
} from "../constants/currency.constants";
import { WidgetName } from "../constants/widget.constants";

/**
 * Функция получения информации о валюте, в зависимости от местоположения
 * @category Utilities - Currency
 * @param location - Текущая локация
 * @returns - Код валюты
 */
export const getCurrencyInfoByLocation = (location: Location): string => {
  const code: string = coordinateToCountry(
    location.latitude,
    location.longitude,
    true
  )[0];

  return code ? CURRENCIES_OF_COUNTRIES[code] : DEFAULT_CURRENCY;
};

/**
 * Функция для расчета стоимости валюты к количеству
 * @category Utilities - Currency
 * @param price - Курс валюты
 * @param quantity - Количество
 * @returns - Стоимость валюты
 */
export const calculateExchangeRate = (
  price?: number,
  quantity: number = 1
): string => {
  return price ? (Math.round(price * quantity * 100) / 100).toFixed(2) : "-";
};

/**
 * Функция получения ссылки на файл svg картинки флага валюты
 * @category Utilities - Currency
 * @param currencyCode
 * @returns - Ссылка на файл svg картинки флага валюты
 */
export const getCountryFlagSvgUrl = (currencyCode?: string): string => {
  const svgName = getFlagSvgName(currencyCode);
  return require(`../static/svgs/widgets/currency/country-flags/${svgName}.svg`);
};

/**
 * Функция получения имени svg картинки флага валюты
 * @category Utilities - Currency
 * @param currencyCode - Код валюты
 * @returns - Имя svg картинки флага валюты
 */
const getFlagSvgName = (currencyCode?: string): string => {
  if (currencyCode) {
    const code = COUNTRIES_OF_CURRENCIES[currencyCode];
    if (code) {
      return code;
    }
  }

  return "_generic";
};

/**
 * Функция, проверяющая нужно ли обновлять список валют для конвертации
 * @category Utilities - Currency
 * @param widgets - Включенные виджеты
 * @param lastCallApi - Дата последнего обновления
 * @returns - <b>True</b>, если необходимо обновить список разрешенных для конвертации валют
 */
export const shouldCurrenciesBeLoaded = (
  widgets: WidgetName[],
  lastCallApi?: Date
): boolean => {
  if (!widgets.includes(WidgetName.CURRENCY)) {
    return false;
  }

  if (!lastCallApi) {
    return true;
  }

  const deltaInHours = (Date.now() - lastCallApi.getTime()) / 3600000;
  return deltaInHours > CURRENCY_UPDATING_PERIOD_IN_HOURS;
};
