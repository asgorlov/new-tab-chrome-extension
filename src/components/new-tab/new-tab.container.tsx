import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotifications,
  setDarkMode,
  setIsDark,
  setLocation,
  setNightPeriod
} from "../../store/new-tab/new-tab.slice";
import { AppDispatch } from "../../store/store";
import NewTabComponent from "./new-tab.component";
import { ConfigProvider } from "antd";
import { AUTO, MANUAL, SYSTEM } from "../../constants/search-engine.constants";
import {
  getCurrentLocation,
  isBrowserDarkModeEnabled
} from "../../utils/dark-mode.utils";
import {
  selectCheckForUpdates,
  selectDarkMode,
  selectLastUpdateDate,
  selectLocation,
  selectNightPeriod,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";
import { checkUpdates } from "../../store/new-tab/new-tab.thunks";
import { shouldBeCheck } from "../../utils/update.utils";
import { createTheme } from "../../utils/search-engine.utils";
import { Notification } from "../../constants/notification.constants";
import { createNightPeriod } from "dark-theme-util";

const NewTabContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector(selectDarkMode);
  const checkMode = useSelector(selectCheckForUpdates);
  const nightPeriod = useSelector(selectNightPeriod);
  const searchEngine = useSelector(selectSearchEngine);
  const lastUpdateDate = useSelector(selectLastUpdateDate);
  const currentLocation = useSelector(selectLocation);

  useEffect(() => {
    getCurrentLocation().then(location => {
      const needToSetLocation =
        location &&
        (!currentLocation ||
          currentLocation.latitude !== location.latitude ||
          currentLocation.longitude !== location.longitude);
      if (needToSetLocation) {
        dispatch(setLocation(location));
      }
    });
  }, [currentLocation, dispatch]);

  useEffect(() => {
    if (shouldBeCheck(lastUpdateDate, checkMode)) {
      dispatch(checkUpdates());
    }
  }, [checkMode, lastUpdateDate, dispatch]);

  useEffect(() => {
    switch (darkMode) {
      case AUTO:
        const now = new Date();
        const isToday = nightPeriod.sunrise?.isSameWithoutTime(now);

        if (isToday) {
          const isNightPeriod =
            nightPeriod.sunrise!.isSameOrAfter(now) ||
            nightPeriod.sunset!.isSameOrBefore(now);
          dispatch(setIsDark(isNightPeriod));
        } else {
          if (currentLocation) {
            const nightPeriod = createNightPeriod(currentLocation, now);
            dispatch(setNightPeriod(nightPeriod));
          } else {
            dispatch(addNotifications(Notification.CanNotGetNightPeriod));
            dispatch(setDarkMode(MANUAL));
          }
        }
        break;
      case SYSTEM:
        dispatch(setIsDark(isBrowserDarkModeEnabled()));
        break;
    }
  }, [nightPeriod, darkMode, currentLocation, dispatch]);

  return (
    <ConfigProvider theme={createTheme(searchEngine)}>
      <NewTabComponent />
    </ConfigProvider>
  );
};

export default NewTabContainer;
