import { NightPeriod } from "../models/night-period.model";

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
 * Функция, позволяющая узнать актуален ли ночной период
 * @category Utilities - Dark Mode
 * @param nightPeriod - Ночной период
 * @returns - <b>True</b>, если ночной период актуален
 */
export const isRelevant = (nightPeriod: NightPeriod): boolean => {
  if (!nightPeriod.sunrise) {
    return false;
  }

  const sunriseDate = nightPeriod.sunrise.toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  return sunriseDate === today;
};

/**
 * Функция получения ночного периода в зависимости от локации
 * @param location - Локация
 * @returns - Ночной период {@link NightPeriod} или null, если координаты отсутствуют
 */
export const getNightPeriod = (
  location?: GeolocationPosition
): NightPeriod | null => {
  const coords = location?.coords;

  if (coords && coords.latitude && coords.longitude) {
    const coordinate = {
      lat: coords.latitude,
      lng: coords.longitude
    };

    return {
      sunrise: new Date().sunrise(coordinate.lat, coordinate.lng),
      sunset: new Date().sunset(coordinate.lat, coordinate.lng)
    };
  }

  return null;
};
