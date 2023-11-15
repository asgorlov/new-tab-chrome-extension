import React, { FC, useCallback, useMemo } from "react";
import { ReactComponent as DarkModeIcon } from "../../../static/svgs/menu-settings/dark-mode-icon.svg";
import { Switch } from "antd";
import {
  AUTO,
  MANUAL,
  SYSTEM
} from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import CollapseComponent from "../../common/collapse/collapse.component";
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
import SelectComponent from "../../common/select/select.component";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";

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

  const options = useMemo(() => {
    return [AUTO, MANUAL, SYSTEM].map(name => {
      return {
        value: name,
        label: t(name),
        key: name
      };
    });
  }, [t]);

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
      type={CollapsedMenuSetting.DARK_MODE}
      title={t("darkModeTitle")}
      onChange={onChangeDarkModeCollapse}
      className="new-tab__settings-menu_dark-mode"
    >
      <div className="new-tab__settings-menu_dark-mode-content">
        <SelectComponent
          isDark={isDark}
          size="small"
          disabled={darkMode === MANUAL && !navigator.geolocation}
          defaultValue={darkMode}
          onChange={v => dispatch(setDarkMode(v))}
          options={options}
        />
        <Switch
          className="new-tab__settings-menu_dark-mode-content-switcher"
          checkedChildren={t("turnOn")}
          unCheckedChildren={t("turnOff")}
          checked={isDark}
          disabled={darkMode !== MANUAL}
          onClick={() => dispatch(setIsDark(!isDark))}
        />
      </div>
    </CollapseComponent>
  );
};

export default DarkModeSettingComponent;
