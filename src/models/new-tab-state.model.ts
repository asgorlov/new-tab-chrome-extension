import { UpdateModel } from "./update.model";
import { CustomWallpaper } from "./custom-wallpaper.model";
import { NightPeriod } from "./night-period.model";

export interface NewTabState {
  isDark: boolean;
  update: UpdateModel;
  showTour: boolean;
  darkMode: string;
  wallpaper: string;
  isOpenMenu?: boolean;
  nightPeriod: NightPeriod;
  checkLoading: boolean;
  searchEngine: string;
  searchEngines: string[];
  currentLanguage: string;
  checkForUpdates: string;
  customWallpaper: CustomWallpaper | null;
}
