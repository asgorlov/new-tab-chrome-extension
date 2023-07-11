import { UpdateModel } from "./update.model";

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
}
