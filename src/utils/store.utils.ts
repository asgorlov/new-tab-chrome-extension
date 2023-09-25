import { NewTabState } from "../models/new-tab-state.model";
import { getInitStateFromChrome } from "./chrome.utils";

/**
 * Асинхронная функция для получения начальных данных стейта
 * @category Utilities - Store
 * @returns - Начальные данные {@link NewTabState}
 */
export const getInitState = async (): Promise<NewTabState> => {
  const data = await getInitStateFromChrome();

  return {
    ...data,
    isOpenMenu: false,
    notifications: []
  };
};
