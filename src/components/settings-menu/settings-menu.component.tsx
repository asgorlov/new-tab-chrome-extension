import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Drawer } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-icon.svg";
import clsx from "clsx";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import ResetSettingComponent from "./settings/reset-setting.component";

interface DarkModeComponentProps {
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
  searchEngineNames: string[];
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  onChangeLanguage: (value: string) => void;
  onChangeSearchEngines: (values: string[]) => void;
  onChangeDarkModeCollapse: (values: string | string[]) => void;
}

const SettingsMenuComponent: FC<DarkModeComponentProps> = ({
  isDark,
  darkMode,
  searchEngine,
  searchEngineNames,
  onClickSwitcher,
  onChangeDarkMode,
  onChangeLanguage,
  onChangeSearchEngines,
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
        <LanguageSettingComponent
          isDark={isDark}
          onChangeLanguage={onChangeLanguage}
        />
      </Drawer>
    </div>
  );
};

export default SettingsMenuComponent;
