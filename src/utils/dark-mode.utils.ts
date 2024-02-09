import { Location } from "dark-theme-util";

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
