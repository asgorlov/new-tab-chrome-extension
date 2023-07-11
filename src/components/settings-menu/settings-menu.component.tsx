import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Drawer } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-icon.svg";
import clsx from "clsx";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import ResetSettingComponent from "./settings/reset-setting.component";
import UpdateSettingComponent from "./settings/update-setting.component";
import WallpaperSettingComponent from "./settings/wallpaper-setting.component";

interface DarkModeComponentProps {
  isDark: boolean;
  darkMode: string;
  wallpaper: string;
  searchEngine: string;
  searchEngineNames: string[];
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  onChangeLanguage: (value: string) => void;
  onClickWallpaper: (value: string) => void;
  onChangeSearchEngines: (values: string[]) => void;
  onChangeCheckForUpdates: (value: string) => void;
  onChangeDarkModeCollapse: (values: string | string[]) => void;
}

const SettingsMenuComponent: FC<DarkModeComponentProps> = ({
  isDark,
  darkMode,
  wallpaper,
  searchEngine,
  searchEngineNames,
  onClickSwitcher,
  onChangeDarkMode,
  onChangeLanguage,
  onClickWallpaper,
  onChangeSearchEngines,
  onChangeCheckForUpdates,
  onChangeDarkModeCollapse
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="new-tab__settings-menu">
      <Button
        className="new-tab__settings-menu-button"
        type="text"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon className={`new-tab__settings-menu-icon-${searchEngine}`} />
      </Button>
      <Drawer
        className={clsx("new-tab__settings-menu-container", { dark: isDark })}
        contentWrapperStyle={{ width: "300px" }}
        drawerStyle={{ background: isDark ? "#292c35" : "#fff" }}
        bodyStyle={{ padding: "0" }}
        title={t("settingsTitle")}
        getContainer={() =>
          document.querySelector(".new-tab__settings-menu") as Element
        }
        footer={<ResetSettingComponent isDark={isDark} />}
        placement="right"
        open={isOpen}
        closable={false}
        onClose={() => setIsOpen(false)}
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
        <WallpaperSettingComponent
          isDark={isDark}
          wallpaper={wallpaper}
          searchEngine={searchEngine}
          onClickWallpaper={onClickWallpaper}
        />
        <LanguageSettingComponent
          isDark={isDark}
          onChangeLanguage={onChangeLanguage}
        />
        <UpdateSettingComponent
          isDark={isDark}
          onChangeCheckMode={onChangeCheckForUpdates}
        />
      </Drawer>
    </div>
  );
};

export default SettingsMenuComponent;
