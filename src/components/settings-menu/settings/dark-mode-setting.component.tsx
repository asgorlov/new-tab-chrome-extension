import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as DarkModeIcon } from "../../../static/svgs/menu-settings/dark-mode-icon.svg";
import { Select, Switch } from "antd";
import {
  AUTO,
  MANUAL,
  SYSTEM
} from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import CollapseComponent from "./collapse.component";

interface DarkModeSettingProps {
  isDark: boolean;
  darkMode: string;
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  onChangeDarkModeCollapse: (values: string | string[]) => void;
}

const DarkModeSettingComponent: FC<DarkModeSettingProps> = ({
  isDark,
  darkMode,
  onClickSwitcher,
  onChangeDarkMode,
  onChangeDarkModeCollapse
}) => {
  const { t } = useTranslation();

  return (
    <CollapseComponent
      icon={<DarkModeIcon />}
      title={t("darkModeTitle")}
      isDark={isDark}
      onChange={onChangeDarkModeCollapse}
      className="new-tab__settings-menu_dark-mode"
    >
      <Select
        className="new-tab__settings-menu_dark-mode-content-selector"
        size="small"
        popupClassName={clsx(
          "new-tab__settings-menu_dark-mode-content-dropdown",
          { dark: isDark }
        )}
        disabled={darkMode === MANUAL && !navigator.geolocation}
        defaultValue={darkMode}
        onChange={onChangeDarkMode}
        options={[AUTO, MANUAL, SYSTEM].map(option => {
          return {
            className: clsx(
              "new-tab__settings-menu_dark-mode-content-dropdown-item",
              { dark: isDark }
            ),
            value: option,
            label: t(option),
            key: option
          };
        })}
      />
      <Switch
        className="new-tab__settings-menu_dark-mode-content-switcher"
        checkedChildren={t("turnOn")}
        unCheckedChildren={t("turnOff")}
        checked={isDark}
        disabled={darkMode !== MANUAL}
        onClick={onClickSwitcher}
      />
    </CollapseComponent>
  );
};

export default DarkModeSettingComponent;
