import React, { FC, lazy, Suspense, useState } from "react";
import { Button } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-settings/menu-icon.svg";
import SettingRefsContextProvider from "../../contexts/setting-refs.context";
import { useTourStepThreeContext } from "../../contexts/tour.context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  selectIsDark,
  selectIsOpenMenu,
  selectIsWidgetsOnRight
} from "../../store/new-tab/new-tab.selectors";
import { setIsOpenMenu } from "../../store/new-tab/new-tab.slice";
import { useToken } from "antd/es/theme/internal";
import clsx from "clsx";
import { Placement } from "rc-drawer/es/DrawerPopup";

const DrawerComponentLazy = lazy(
  () => import("../common/drawer/drawer.component")
);
const SearchEngineSettingComponentLazy = lazy(
  () => import("./settings/search-engine-setting.component")
);
const DarkModeSettingComponentLazy = lazy(
  () => import("./settings/dark-mode-setting.component")
);
const LanguageSettingComponentLazy = lazy(
  () => import("./settings/language-setting.component")
);
const WallpaperSettingContainerLazy = lazy(
  () => import("./settings/wallpaper-setting/wallpaper-setting.container")
);
const CommonSettingContainerLazy = lazy(
  () => import("./settings/common-setting/common-setting.container")
);
const UpdateSettingComponentLazy = lazy(
  () => import("./settings/update-setting.component")
);
const SettingsHeaderContainerLazy = lazy(
  () => import("./settings-header/settings-header.container")
);
const WidgetsSettingComponentLazy = lazy(
  () => import("./settings/widgets-setting/widgets-setting.component")
);

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
  const isWidgetsOnRight = useSelector(selectIsWidgetsOnRight);

  const [placement, setPlacement] = useState<Placement>(
    isWidgetsOnRight ? "left" : "right"
  );

  const menuClass = "new-tab__settings-menu";

  const openMenu = () => {
    dispatch(setIsOpenMenu(true));
    setPlacement(isWidgetsOnRight ? "left" : "right");
  };

  return (
    <div className={clsx(menuClass, { _right: !isWidgetsOnRight })}>
      <Button
        className="new-tab__settings-menu-button"
        type="text"
        onClick={openMenu}
      >
        <MenuIcon
          className="new-tab__settings-menu-icon"
          style={{ fill: token[1].colorPrimary }}
        />
      </Button>
      <SettingRefsContextProvider>
        <Suspense>
          <DrawerComponentLazy
            title={<SettingsHeaderContainerLazy />}
            isDark={isDark}
            className="new-tab__settings-menu-container"
            menuClassName={menuClass}
            open={isOpenMenu}
            onClose={() => dispatch(setIsOpenMenu(false))}
            placement={placement}
          >
            <div ref={tourCtx} className="new-tab__settings-menu-content">
              <CommonSettingContainerLazy />
              <SearchEngineSettingComponentLazy />
              <DarkModeSettingComponentLazy />
              <WallpaperSettingContainerLazy />
              <UpdateSettingComponentLazy />
              <WidgetsSettingComponentLazy />
              <LanguageSettingComponentLazy />
            </div>
          </DrawerComponentLazy>
        </Suspense>
      </SettingRefsContextProvider>
    </div>
  );
};

export default SettingsMenuComponent;
