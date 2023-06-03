import { checkForUpdates } from "../constants/check-for-updates.constants";

export const shouldBeCheck = (dateInMs: number, checkMode: string): boolean => {
  const delta = (Date.now() - dateInMs) / 86400000;

  switch (checkMode) {
    case checkForUpdates.DAY:
      return delta > 1;
    case checkForUpdates.WEEK:
      return delta > 7;
    case checkForUpdates.MONTH:
      return delta > 30;
    default:
      return false;
  }
};

export const getDownloadLink = (version: string) => {
  return (
    "https://github.com/asgorlov/new-tab-chrome-extension/releases/download" +
    `/v${version}/build-v${version}.zip`
  );
};
