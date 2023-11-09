import { NewTabState } from "../models/new-tab-state.model";
import { getInitStateFromChrome } from "./chrome.utils";
import { CollapsedMenuSetting } from "../constants/settings-menu.constants";

/**
 * Асинхронная функция для получения начальных данных стейта
 * @category Utilities - Store
 * @returns - Начальные данные {@link NewTabState}
 */
export const getInitState = async (): Promise<NewTabState> => {
  const data = await getInitStateFromChrome();
  const settingsActiveKeys = {};

  Object.values(CollapsedMenuSetting).forEach(s => {
    Object.assign(settingsActiveKeys, { [s]: [] });
  });

  return {
    ...data,
    isOpenMenu: false,
    notifications: [],
    settingsActiveKeys
  };
};
