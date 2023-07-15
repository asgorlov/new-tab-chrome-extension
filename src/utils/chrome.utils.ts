import i18n from "../localizations/i18n";
import { NewTabState } from "../models/new-tab-state.model";
import { updateStateWithFeatures } from "./update.utils";
import defaultStore from "../constants/default-store.constants";

export const getInitStateFromChrome = async (): Promise<NewTabState> => {
  const data = chrome?.storage
    ? ((await chrome.storage.sync.get(defaultStore)) as NewTabState)
    : { ...defaultStore };

  if (!data.currentLanguage) {
    data.currentLanguage = i18n.language;
  } else if (data.currentLanguage !== i18n.language) {
    await i18n.changeLanguage(data.currentLanguage);
  }

  updateStateWithFeatures(data);

  return data;
};

export const setDataToChrome = (items: { [key: string]: any }): boolean => {
  if (chrome?.storage) {
    chrome.storage.sync.set(items).then();

    return true;
  }

  return false;
};
