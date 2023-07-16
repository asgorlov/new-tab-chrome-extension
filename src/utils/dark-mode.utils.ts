import { NightPeriod } from "../models/night-period.model";

export const isBrowserDarkModeEnabled = (): boolean => {
  const mediaQueryString = "(prefers-color-scheme: dark)";

  return window.matchMedia(mediaQueryString).matches;
};

export const isSunsetTimeCached = (nightPeriod: NightPeriod): boolean => {
  const now = new Date();
  const sunset = nightPeriod.sunset ? new Date(nightPeriod.sunset) : null;
  const sunrise = nightPeriod.sunrise ? new Date(nightPeriod.sunrise) : null;

  return Boolean(
    sunset && sunrise && sunrise.toDateString() === now.toDateString()
  );
};
