import React, { FC, useState } from "react";
import { ReactComponent as GearIcon } from "../../static/svgs/gear.svg";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { AUTO, MANUAL } from "../../constants/search-engine.constants";
import { Popover, Select, Switch } from "antd";

interface DarkModeComponentProps {
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  getPopupContainer: (node: HTMLElement) => HTMLElement;
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
}

const SettingsMenuComponent: FC<DarkModeComponentProps> = ({
  onClickSwitcher,
  onChangeDarkMode,
  getPopupContainer,
  isDark,
  darkMode,
  searchEngine
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="new-tab__settings-menu">
      <Popover
        overlayClassName="new-tab__settings-menu-popover"
        placement="bottomRight"
        trigger="click"
        onOpenChange={() => setIsOpen(!isOpen)}
        getPopupContainer={getPopupContainer}
        title={t("darkModeTitle")}
        content={
          <>
            <hr />
            <Select
              className="new-tab__settings-menu-content_dark-mode"
              size="small"
              disabled={darkMode === MANUAL && !navigator.geolocation}
              defaultValue={darkMode}
              onChange={onChangeDarkMode}
              options={[
                { value: AUTO, label: t(AUTO) },
                { value: MANUAL, label: t(MANUAL) }
              ]}
            />
            <Switch
              className="new-tab__settings-menu-content_dark-switcher"
              checkedChildren={t("turnOn")}
              unCheckedChildren={t("turnOff")}
              checked={isDark}
              disabled={darkMode === AUTO}
              onClick={onClickSwitcher}
            />
          </>
        }
      >
        <div className={"new-tab__settings-menu-container"}>
          <GearIcon
            className={clsx(`new-tab__settings-menu-icon-${searchEngine}`, {
              rotate: isOpen
            })}
          />
        </div>
      </Popover>
    </div>
  );
};

export default SettingsMenuComponent;
