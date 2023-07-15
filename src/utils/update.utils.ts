import { checkForUpdates } from "../constants/check-for-updates.constants";
import {
  AOL,
  BING,
  BRAVE,
  ECOSIA,
  GIBIRU,
  LYCOS,
  NIGMA,
  SWISSCOWS,
  YAHOO,
  YOUCOM
} from "../constants/search-engine.constants";
import { setDataToChromeSyncStorage } from "./chrome.utils";
import { NewTabState } from "../models/new-tab-state.model";
import { Features } from "../models/update.model";

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

export const updateStateWithFeatures = (data: NewTabState) => {
  if (!data.update.previousVersion) {
    data.update.previousVersion = data.update.lastVersion;
    setDataToChromeSyncStorage({ update: data.update });
  }

  if (data.update.previousVersion < data.update.lastVersion) {
    const features = getLastVersionFeaturesRegardingPrevious(
      data.update.lastVersion,
      data.update.previousVersion
    );

    features.searchEngines
      .filter(searchEngine => !data.searchEngines.includes(searchEngine))
      .forEach(searchEngine => data.searchEngines.push(searchEngine));
    setDataToChromeSyncStorage({ searchEngines: data.searchEngines });

    data.update.previousVersion = data.update.lastVersion;
    setDataToChromeSyncStorage({ update: data.update });
  }
};

const getLastVersionFeaturesRegardingPrevious = (
  lastVersion: string,
  previousVersion: string
): Features => {
  if (previousVersion <= "2.2.0") {
    return {
      searchEngines: [
        BING,
        YAHOO,
        BRAVE,
        SWISSCOWS,
        AOL,
        YOUCOM,
        GIBIRU,
        LYCOS,
        NIGMA
      ]
    };
  } else if (previousVersion === "2.3.0") {
    return {
      searchEngines: [
        YAHOO,
        BRAVE,
        SWISSCOWS,
        AOL,
        YOUCOM,
        GIBIRU,
        LYCOS,
        NIGMA
      ]
    };
  } else if (previousVersion === "2.4.0") {
    return {
      searchEngines: [BRAVE, SWISSCOWS, AOL, YOUCOM, GIBIRU, LYCOS, NIGMA]
    };
  } else if (previousVersion <= "3.0.2") {
    return {
      searchEngines: [LYCOS, NIGMA]
    };
  } else if (previousVersion === "3.1.0") {
    return {
      searchEngines: [ECOSIA]
    };
  }

  return { searchEngines: [] };
};
