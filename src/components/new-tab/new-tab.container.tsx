import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotifications,
  setCurrentLocation,
  setDefaultMainCurrency,
  setIsDark,
  setNightPeriod
} from "../../store/new-tab/new-tab.slice";
import { AppDispatch } from "../../store/store";
import NewTabComponent from "./new-tab.component";
import { ConfigProvider } from "antd";
import { AUTO, SYSTEM } from "../../constants/search-engine.constants";
import {
  createNightPeriod,
  getCurrentLocation,
  isBrowserDarkModeEnabled,
  isNightPeriodNow
} from "../../utils/dark-mode.utils";
import {
  selectCheckForUpdates,
  selectCurrentLocation,
  selectDarkMode,
  selectLastUpdateDate,
  selectNightPeriod,
  selectSearchEngine,
  selectWidgets
} from "../../store/new-tab/new-tab.selectors";
import { checkUpdates } from "../../store/new-tab/new-tab.thunks";
import { shouldBeCheckedUpdates } from "../../utils/update.utils";
import { createTheme } from "../../utils/search-engine.utils";
import { Notification } from "../../constants/notification.constants";
import { WidgetName } from "../../constants/widget.constants";
import { getCurrencyInfoByLocation } from "../../utils/currency.utils";

const NewTabContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector(selectDarkMode);
  const checkMode = useSelector(selectCheckForUpdates);
  const nightPeriod = useSelector(selectNightPeriod);
  const searchEngine = useSelector(selectSearchEngine);
  const lastUpdateDate = useSelector(selectLastUpdateDate);
  const currentLocation = useSelector(selectCurrentLocation);
  const widgets = useSelector(selectWidgets);

  useEffect(() => {
    if (shouldBeCheckedUpdates(lastUpdateDate, checkMode)) {
      dispatch(checkUpdates());
    }
  }, [checkMode, lastUpdateDate, dispatch]);

  useEffect(() => {
    const getLocation =
      darkMode === AUTO ||
      widgets.includes(WidgetName.WEATHER) ||
      widgets.includes(WidgetName.CURRENCY);

    if (getLocation) {
      getCurrentLocation().then(l => {
        const location = l || currentLocation;
        const areEqualLocations =
          JSON.stringify(location) === JSON.stringify(currentLocation);
        if (!areEqualLocations) {
          dispatch(setCurrentLocation(location));

          if (location && widgets.includes(WidgetName.CURRENCY)) {
            const defaultCurrencies = getCurrencyInfoByLocation(location);
            dispatch(setDefaultMainCurrency(defaultCurrencies));
          }
        }

        const now = new Date();
        const isNotToday = !nightPeriod.sunrise?.isSameWithoutTime(now);
        if (isNotToday) {
          const action = location
            ? setNightPeriod(createNightPeriod(location, now))
            : addNotifications(Notification.CanNotGetNightPeriod);
          dispatch(action);
        }
      });
    }
  }, [darkMode, widgets, dispatch, currentLocation, nightPeriod]);

  useEffect(() => {
    if (darkMode === AUTO) {
      dispatch(setIsDark(isNightPeriodNow(nightPeriod)));
    } else if (darkMode === SYSTEM) {
      dispatch(setIsDark(isBrowserDarkModeEnabled()));
    }
  }, [nightPeriod, darkMode, dispatch, currentLocation]);

  return (
    <ConfigProvider theme={createTheme(searchEngine)}>
      <NewTabComponent />
    </ConfigProvider>
  );
};

export default NewTabContainer;
