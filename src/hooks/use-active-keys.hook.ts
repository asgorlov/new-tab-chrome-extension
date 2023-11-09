import { CollapsedMenuSetting } from "../constants/settings-menu.constants";
import { useSelector } from "react-redux";
import { selectSettingActiveKeysByName } from "../store/new-tab/new-tab.selectors";
import { RootState } from "../store/store";

/**
 * Хук для получения параметра настройки, по которому можно определить развернут ли сворачиваемый компонент
 * @category Hooks - Settings menu
 * @param name - Алиас настройки меню
 * @returns - Параметр настройки, по которому можно определить развернут ли сворачиваемый компонент
 */
export const useSettingActiveKeys = (name: CollapsedMenuSetting): string[] =>
  useSelector((state: RootState) => selectSettingActiveKeysByName(state, name));
