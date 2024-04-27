import { NewTabState } from "../models/new-tab-state.model";
import { CollapsedMenuSetting } from "../constants/settings-menu.constants";
import db from "../db/db";

/**
 * Асинхронная функция для получения начальных данных стейта
 * @category Utilities - Store
 * @returns - Начальные данные {@link NewTabState}
 */
export const getInitState = async (): Promise<NewTabState> => {
  const data = await db.getAll();
  const settingsActiveKeys = {};

  Object.values(CollapsedMenuSetting).forEach(s => {
    Object.assign(settingsActiveKeys, { [s]: [] });
  });

  return {
    ...data,
    isOpenMenu: false,
    notifications: [],
    settingsActiveKeys,
    weatherLoading: false,
    currencyLoading: false
  };
};
