import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Drawer } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-settings/menu-icon.svg";
import clsx from "clsx";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import WallpaperSettingContainer from "./settings/wallpaper-setting/wallpaper-setting.container";
import UpdateSettingContainer from "./settings/update-setting/update-setting.container";
import { TourContextModel } from "../../models/tour-context.model";
import CommonSettingContainer from "./settings/common-setting/common-setting.container";

/**
 * Передаваемые параметры для компонента меню настроек
 * @property isDark - Флаг темной темы
 * @property tourCtx - Модель контекста ознакомительно тура
 * @property isOpenMenu - Флаг открытия меню настроек
 * @property searchEngine - Выбранная поисковая система
 * @property setIsOpenMenu - Функция изменения флага открытия меню настроек
 * @interface
 */
export interface SettingsMenuComponentProps {
  isDark: boolean;
  tourCtx?: TourContextModel;
  isOpenMenu: boolean;
  searchEngine: string;
  setIsOpenMenu: (value: boolean) => void;
}

/**
 * Компонент меню настроек
 * @category Components
 */
const SettingsMenuComponent: FC<SettingsMenuComponentProps> = ({
  isDark,
  tourCtx,
  isOpenMenu,
  searchEngine,
  setIsOpenMenu
}) => {
  const { t } = useTranslation();
  const menuClass = "new-tab__settings-menu";
  const menuContainerClass = "new-tab__settings-menu-container";

  useEffect(() => {
    if (tourCtx) {
      tourCtx.settingsMenuContainerClass = `.${menuContainerClass}`;
    }
  }, [tourCtx]);

  return (
    <div className={menuClass}>
      <Button
        className="new-tab__settings-menu-button"
        type="text"
        onClick={() => setIsOpenMenu(true)}
      >
        <MenuIcon className={`new-tab__settings-menu-icon-${searchEngine}`} />
      </Button>
      <Drawer
        className={clsx(menuContainerClass, { dark: isDark })}
        contentWrapperStyle={{ width: "300px" }}
        drawerStyle={{ background: isDark ? "#292c35" : "#fff" }}
        bodyStyle={{ padding: "0" }}
        title={t("settingsTitle")}
        getContainer={() =>
          document.querySelector(`.${menuClass}`) as HTMLDivElement
        }
        placement="right"
        open={isOpenMenu}
        closable={false}
        onClose={() => setIsOpenMenu(false)}
      >
        <CommonSettingContainer />
        <SearchEngineSettingComponent />
        <DarkModeSettingComponent />
        <WallpaperSettingContainer />
        <UpdateSettingContainer />
        <LanguageSettingComponent />
      </Drawer>
    </div>
  );
};

export default SettingsMenuComponent;
