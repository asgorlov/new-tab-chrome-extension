import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Drawer } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-settings/menu-icon.svg";
import clsx from "clsx";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import ResetSettingComponent from "./settings/reset-setting.component";
import WallpaperSettingContainer from "./settings/wallpaper-setting/wallpaper-setting.container";
import UpdateSettingContainer from "./settings/update-setting/update-setting.container";
import { TourContextModel } from "../../models/tour-context.model";

interface SettingsMenuComponentProps {
  isDark: boolean;
  tourCtx?: TourContextModel;
  darkMode: string;
  checkMode: string;
  wallpaper: string;
  isOpenMenu: boolean;
  lastVersion: string;
  checkLoading: boolean;
  searchEngine: string;
  customWallpaper: CustomWallpaper | null;
  searchEngineNames: string[];
  setWallpaper: (value: string) => void;
  setIsOpenMenu: (value: boolean) => void;
  onClickUpdates: () => void;
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  onChangeLanguage: (value: string) => void;
  setCustomWallpaper: (value: CustomWallpaper | null) => void;
  onChangeSearchEngines: (values: string[]) => void;
  onChangeCheckForUpdates: (value: string) => void;
  onChangeDarkModeCollapse: (values: string | string[]) => void;
}

const SettingsMenuComponent: FC<SettingsMenuComponentProps> = ({
  isDark,
  tourCtx,
  darkMode,
  checkMode,
  wallpaper,
  isOpenMenu,
  lastVersion,
  checkLoading,
  searchEngine,
  customWallpaper,
  searchEngineNames,
  setWallpaper,
  setIsOpenMenu,
  onClickUpdates,
  onClickSwitcher,
  onChangeDarkMode,
  onChangeLanguage,
  setCustomWallpaper,
  onChangeSearchEngines,
  onChangeCheckForUpdates,
  onChangeDarkModeCollapse
}) => {
  const { t } = useTranslation();
  const settingMenuContainerClass = "new-tab__settings-menu-container";

  useEffect(() => {
    if (tourCtx) {
      tourCtx.settingsMenuClass = `.${settingMenuContainerClass}`;
    }
  }, [tourCtx]);

  return (
    <div className="new-tab__settings-menu">
      <Button
        className="new-tab__settings-menu-button"
        type="text"
        onClick={() => setIsOpenMenu(true)}
      >
        <MenuIcon className={`new-tab__settings-menu-icon-${searchEngine}`} />
      </Button>
      <Drawer
        className={clsx(settingMenuContainerClass, { dark: isDark })}
        contentWrapperStyle={{ width: "300px" }}
        drawerStyle={{ background: isDark ? "#292c35" : "#fff" }}
        bodyStyle={{ padding: "0" }}
        title={t("settingsTitle")}
        getContainer={() =>
          document.querySelector(".new-tab__settings-menu") as Element
        }
        footer={<ResetSettingComponent isDark={isDark} />}
        placement="right"
        open={isOpenMenu}
        closable={false}
        onClose={() => setIsOpenMenu(false)}
      >
        <SearchEngineSettingComponent
          isDark={isDark}
          searchEngineNames={searchEngineNames}
          onChangeSearchEngines={onChangeSearchEngines}
        />
        <DarkModeSettingComponent
          isDark={isDark}
          darkMode={darkMode}
          onClickSwitcher={onClickSwitcher}
          onChangeDarkMode={onChangeDarkMode}
          onChangeDarkModeCollapse={onChangeDarkModeCollapse}
        />
        <WallpaperSettingContainer
          isDark={isDark}
          wallpaper={wallpaper}
          customWallpaper={customWallpaper}
          searchEngine={searchEngine}
          setWallpaper={setWallpaper}
          setCustomWallpaper={setCustomWallpaper}
        />
        <UpdateSettingContainer
          isDark={isDark}
          loading={checkLoading}
          checkMode={checkMode}
          lastVersion={lastVersion}
          onClickUpdates={onClickUpdates}
          onChangeCheckMode={onChangeCheckForUpdates}
        />
        <LanguageSettingComponent
          isDark={isDark}
          onChangeLanguage={onChangeLanguage}
        />
      </Drawer>
    </div>
  );
};

export default SettingsMenuComponent;
