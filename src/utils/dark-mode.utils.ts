import { Location } from "../models/location.model";
import { NightPeriod } from "../models/night-period.model";

/**
 * Функция создания объекта ночного периода
 * @category Utilities - Dark Mode
 * @param location - Текущая локация
 * @param date - Дата, для которой будет рассчитываться ночной период
 * @returns - Ночной период {@link NightPeriod}
 */
export const createNightPeriod = (
  location: Location,
  date: Date = new Date()
): NightPeriod => {
  const latitude = location.latitude;
  const longitude = location.longitude;

  return {
    sunrise: date.sunrise(latitude, longitude),
    sunset: date.sunset(latitude, longitude)
  };
};

/**
 * Функция, позволяющая узнать на данный момент ночь или нет
 * @category Utilities - Dark Mode
 * @param nightPeriod - Ночной период текущего дня
 * @returns - <b>True</b>, если сейчас ночь
 */
export const isNightPeriodNow = (nightPeriod: NightPeriod): boolean => {
  const now = new Date();

  return (
    (!!nightPeriod.sunrise && nightPeriod.sunrise.isSameOrAfter(now)) ||
    (!!nightPeriod.sunset && nightPeriod.sunset.isSameOrBefore(now))
  );
};

/**
 * Функция, позволяющая узнать включена ли темная тема в браузере
 * @category Utilities - Dark Mode
 * @returns - <b>True</b>, если в браузере включен темный режим
 */
export const isBrowserDarkModeEnabled = (): boolean => {
  const mediaQueryString = "(prefers-color-scheme: dark)";

  return window.matchMedia(mediaQueryString).matches;
};

/**
 * Функция получения текущей локации
 * @category Utilities - Dark Mode
 * @returns - Текущая локация {@link Location} или null, если координаты отсутствуют
 */
export const getCurrentLocation = async (): Promise<Location | null> => {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = position?.coords;

        if (coords && coords.latitude && coords.longitude) {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude
          });
        } else {
          resolve(null);
        }
      },
      () => resolve(null)
    );
  });
};
