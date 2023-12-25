import React, { FC } from "react";
import { Button } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-settings/menu-icon.svg";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import WallpaperSettingContainer from "./settings/wallpaper-setting/wallpaper-setting.container";
import CommonSettingContainer from "./settings/common-setting/common-setting.container";
import DrawerComponent from "../common/drawer/drawer.component";
import UpdateSettingComponent from "./settings/update-setting.component";
import SettingsHeaderContainer from "./settings-header/settings-header.container";
import SettingRefsContextProvider from "../../contexts/setting-refs.context";
import { useTourStepThreeContext } from "../../contexts/tour.context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  selectIsDark,
  selectIsOpenMenu
} from "../../store/new-tab/new-tab.selectors";
import { setIsOpenMenu } from "../../store/new-tab/new-tab.slice";

/**
 * Компонент меню настроек
 * @category Components
 */
const SettingsMenuComponent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tourCtx = useTourStepThreeContext();
  const token = useToken();

  const isDark = useSelector(selectIsDark);
  const isOpenMenu = useSelector(selectIsOpenMenu);

  const menuClass = "new-tab__settings-menu";

  return (
    <div className={menuClass}>
      <Button
        className="new-tab__settings-menu-button"
        type="text"
        onClick={() => dispatch(setIsOpenMenu(true))}
      >
        <MenuIcon
          className="new-tab__settings-menu-icon"
          style={{ fill: token[1].colorPrimary }}
        />
      </Button>
      <SettingRefsContextProvider>
        <DrawerComponent
          title={<SettingsHeaderContainer />}
          isDark={isDark}
          className="new-tab__settings-menu-container"
          menuClassName={menuClass}
          open={isOpenMenu}
          onClose={() => dispatch(setIsOpenMenu(false))}
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
};

export default SettingsMenuComponent;
