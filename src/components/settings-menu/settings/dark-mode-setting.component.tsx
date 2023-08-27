import React, { FC, useCallback } from "react";
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
import { SelectOption } from "../../../models/select-option.model";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDarkMode,
  selectIsDark,
  selectNightPeriod
} from "../../../store/new-tab/new-tab.selectors";
import { AppDispatch } from "../../../store/store";
import { setDarkMode, setIsDark } from "../../../store/new-tab/new-tab.slice";
import { isSunsetTimeCached } from "../../../utils/dark-mode.utils";
import { getNightPeriodByLocation } from "../../../store/new-tab/new-tab.thunks";

/**
 * Компонент настройки темного режима
 * @category Components
 */
const DarkModeSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const nightPeriod = useSelector(selectNightPeriod);

  const getOption = (option: string): SelectOption => {
    return {
      className: clsx(
        "new-tab__settings-menu_dark-mode-content-dropdown-item",
        { dark: isDark }
      ),
      value: option,
      label: t(option),
      key: option
    };
  };

  const onChangeDarkModeCollapse = useCallback(
    (key: string | string[]) => {
      if (key.length && !isSunsetTimeCached(nightPeriod)) {
        navigator.geolocation.getCurrentPosition(location => {
          const coords = location?.coords;
          if (coords && coords.latitude && coords.longitude) {
            const coordinate = {
              lat: coords.latitude,
              lng: coords.longitude
            };
            dispatch(getNightPeriodByLocation(coordinate));
          }
        });
      }
    },
    [nightPeriod, dispatch]
  );

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
        onChange={v => dispatch(setDarkMode(v))}
        options={[AUTO, MANUAL, SYSTEM].map(option => getOption(option))}
      />
      <Switch
        className="new-tab__settings-menu_dark-mode-content-switcher"
        checkedChildren={t("turnOn")}
        unCheckedChildren={t("turnOff")}
        checked={isDark}
        disabled={darkMode !== MANUAL}
        onClick={() => dispatch(setIsDark(!isDark))}
      />
    </CollapseComponent>
  );
};

export default DarkModeSettingComponent;
