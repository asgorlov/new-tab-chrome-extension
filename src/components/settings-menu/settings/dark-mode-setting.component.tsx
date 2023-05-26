import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as DarkModeIcon } from "../../../static/svgs/dark-mode-icon.svg";
import { Collapse, Select, Switch } from "antd";
import {
  AUTO,
  MANUAL,
  SYSTEM
} from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";

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
  const { Panel } = Collapse;

  return (
    <Collapse
      accordion={true}
      bordered={false}
      expandIconPosition="end"
      onChange={onChangeDarkModeCollapse}
    >
      <Panel
        className={clsx("new-tab__settings-menu_dark-mode", {
          dark: isDark
        })}
        header={
          <div
            className={clsx("new-tab__settings-menu_dark-mode-header", {
              dark: isDark
            })}
          >
            <DarkModeIcon />
            <span>{t("darkModeTitle")}</span>
          </div>
        }
        key={t("darkModeTitle")}
      >
        <div
          className={clsx("new-tab__settings-menu_dark-mode-content", {
            dark: isDark
          })}
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
        </div>
      </Panel>
    </Collapse>
  );
};

export default DarkModeSettingComponent;
