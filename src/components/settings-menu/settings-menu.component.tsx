import React, { FC, memo } from "react";
import { Button } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-settings/menu-icon.svg";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import WallpaperSettingContainer from "./settings/wallpaper-setting/wallpaper-setting.container";
import CommonSettingContainer from "./settings/common-setting/common-setting.container";
import DrawerComponent from "../common/drawer/drawer.component";
import { SEARCH_THEMES } from "../../constants/search-engine.constants";
import UpdateSettingComponent from "./settings/update-setting.component";
import SettingsHeaderContainer from "./settings-header/settings-header.container";
import SettingRefsContextProvider from "../../contexts/setting-refs.context";
import { useTourStepThreeContext } from "../../contexts/tour.context";

/**
 * Передаваемые параметры для компонента меню настроек
 * @property isDark - Флаг темной темы
 * @property menuClass - Название класса стилей для меню настроек
 * @property isOpenMenu - Флаг открытия меню настроек
 * @property searchEngine - Выбранная поисковая система
 * @property setIsOpenMenu - Функция изменения флага открытия меню настроек
 * @interface
 */
export interface SettingsMenuComponentProps {
  isDark: boolean;
  menuClass: string;
  isOpenMenu: boolean;
  searchEngine: string;
  setIsOpenMenu: (value: boolean) => void;
}

/**
 * Компонент меню настроек
 * @category Components
 */
const SettingsMenuComponent: FC<SettingsMenuComponentProps> = memo(
  ({ isDark, menuClass, isOpenMenu, searchEngine, setIsOpenMenu }) => {
    const tourCtx = useTourStepThreeContext();

    return (
      <div className={menuClass}>
        <Button
          className="new-tab__settings-menu-button"
          type="text"
          onClick={() => setIsOpenMenu(true)}
        >
          <MenuIcon
            className="new-tab__settings-menu-icon"
            style={{ fill: SEARCH_THEMES[searchEngine] }}
          />
        </Button>
        <SettingRefsContextProvider>
          <DrawerComponent
            title={<SettingsHeaderContainer />}
            isDark={isDark}
            className="new-tab__settings-menu-container"
            menuClassName={menuClass}
            open={isOpenMenu}
            onClose={() => setIsOpenMenu(false)}
          >
            <div ref={tourCtx} className="new-tab__settings-menu-content">
              <CommonSettingContainer />
              <SearchEngineSettingComponent />
              <DarkModeSettingComponent />
              <WallpaperSettingContainer />
              <UpdateSettingComponent />
              <LanguageSettingComponent />
            </div>
          </DrawerComponent>
        </SettingRefsContextProvider>
      </div>
    );
  }
);

export default SettingsMenuComponent;
