export const isBrowserDarkModeEnabled = (): boolean => {
  const mediaQueryString = "(prefers-color-scheme: dark)";

  return window.matchMedia(mediaQueryString).matches;
};

export const isSunsetTimeCached = (
  sunset: string | null | undefined
): boolean => {
  const now = new Date();
  const sunsetDate = sunset ? new Date(sunset) : null;

  return (
    !!sunsetDate &&
    sunsetDate.getFullYear() === now.getFullYear() &&
    sunsetDate.getMonth() === now.getMonth() &&
    sunsetDate.getDate() === now.getDate()
  );
};
