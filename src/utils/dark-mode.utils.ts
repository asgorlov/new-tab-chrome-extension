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
 * Функция, позволяющая узнать закэширован ли ночной период
 * @category Utilities - Dark Mode
 * @param nightPeriod - Ночной период
 * @returns - <b>True</b>, если ночной период закэширован
 */
export const isSunsetTimeCached = (nightPeriod: NightPeriod): boolean => {
  const now = new Date();
  const sunset = nightPeriod.sunset ? new Date(nightPeriod.sunset) : null;
  const sunrise = nightPeriod.sunrise ? new Date(nightPeriod.sunrise) : null;

  return Boolean(
    sunset && sunrise && sunrise.toDateString() === now.toDateString()
  );
};
