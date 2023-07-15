import { UpdateModel } from "./update.model";
import { CustomWallpaper } from "./custom-wallpaper.model";

export interface NewTabState {
  sunset: string | null;
  isDark: boolean;
  update: UpdateModel;
  darkMode: string;
  wallpaper: string;
  searchEngine: string;
  searchEngines: string[];
  currentLanguage: string;
  checkForUpdates: string;
  customWallpaper: CustomWallpaper | null;
}
