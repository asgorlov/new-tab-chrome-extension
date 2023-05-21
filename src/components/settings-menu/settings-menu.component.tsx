import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AUTO, MANUAL } from "../../constants/search-engine.constants";
import { Button, Collapse, Drawer, Select, Switch } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-icon.svg";
import { ReactComponent as DarkModeIcon } from "../../static/svgs/dark-mode-icon.svg";
import clsx from "clsx";
import i18n from "../../localizations/i18n";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../store/new-tab.slice";

interface DarkModeComponentProps {
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  onChangeLanguage: (value: string) => void;
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
}

const SettingsMenuComponent: FC<DarkModeComponentProps> = ({
  onClickSwitcher,
  onChangeDarkMode,
  onChangeLanguage,
  isDark,
  darkMode,
  searchEngine
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = useSelector(selectCurrentLanguage);

  const { Panel } = Collapse;

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
        placement="right"
        open={isOpen}
        closable={false}
        onClose={() => setIsOpen(false)}
      >
        <Collapse accordion={true} bordered={false} expandIconPosition="end">
          <Panel
            className={clsx("new-tab__settings-menu_dark-mode", {
              dark: isDark
            })}
            header={
              <div
                className={clsx("new-tab__settings-menu_dark-mode_header", {
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
                className="new-tab__settings-menu_dark-mode-content_selector"
                size="small"
                popupClassName={clsx(
                  "new-tab__settings-menu_dark-mode-content_dropdown",
                  { dark: isDark }
                )}
                dropdownStyle={{ backgroundColor: isDark ? "#292c35" : "#fff" }}
                disabled={darkMode === MANUAL && !navigator.geolocation}
                defaultValue={darkMode}
                onChange={onChangeDarkMode}
                options={[
                  {
                    className: clsx(
                      "new-tab__settings-menu_dark-mode-content_dropdown-item",
                      { dark: isDark }
                    ),
                    value: AUTO,
                    label: t(AUTO),
                    key: AUTO
                  },
                  {
                    className: clsx(
                      "new-tab__settings-menu_dark-mode-content_dropdown-item",
                      { dark: isDark }
                    ),
                    value: MANUAL,
                    label: t(MANUAL),
                    key: MANUAL
                  }
                ]}
              />
              <Switch
                className="new-tab__settings-menu_dark-mode-content_switcher"
                checkedChildren={t("turnOn")}
                unCheckedChildren={t("turnOff")}
                checked={isDark}
                disabled={darkMode === AUTO}
                onClick={onClickSwitcher}
              />
            </div>
          </Panel>
        </Collapse>
        <div className="new-tab__settings-menu_language">
          <div className="new-tab__settings-menu_language-header"></div>
          <Select
            className="new-tab__settings-menu_language_selector"
            defaultValue={currentLanguage}
            onChange={onChangeLanguage}
            options={i18n.languages.map(lng => {
              return {
                className: clsx(
                  "new-tab__settings-menu_language_dropdown-item",
                  { dark: isDark }
                ),
                value: lng,
                label: t(`language.${lng}`),
                key: lng
              };
            })}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default SettingsMenuComponent;
