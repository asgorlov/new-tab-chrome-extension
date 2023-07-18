import manifest from "../../public/manifest.json";

export const checkForUpdates: Record<string, string> = {
  MANUAL: "manual",
  DAY: "onceDay",
  WEEK: "onceWeek",
  MONTH: "onceMonth"
};

export const CURRENT_EXT_VERSION = manifest.version;
