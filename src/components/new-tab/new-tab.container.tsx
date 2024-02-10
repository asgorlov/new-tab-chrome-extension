import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotifications,
  setIsDark,
  setNightPeriod
} from "../../store/new-tab/new-tab.slice";
import { AppDispatch } from "../../store/store";
import NewTabComponent from "./new-tab.component";
import { ConfigProvider } from "antd";
import { AUTO, SYSTEM } from "../../constants/search-engine.constants";
import {
  getCurrentLocation,
  isBrowserDarkModeEnabled,
  isNightPeriodNow,
  createNightPeriod
} from "../../utils/dark-mode.utils";
import {
  selectCheckForUpdates,
  selectDarkMode,
  selectLastUpdateDate,
  selectNightPeriod,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";
import { checkUpdates } from "../../store/new-tab/new-tab.thunks";
import { shouldBeCheck } from "../../utils/update.utils";
import { createTheme } from "../../utils/search-engine.utils";
import { Notification } from "../../constants/notification.constants";

const NewTabContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector(selectDarkMode);
  const checkMode = useSelector(selectCheckForUpdates);
  const nightPeriod = useSelector(selectNightPeriod);
  const searchEngine = useSelector(selectSearchEngine);
  const lastUpdateDate = useSelector(selectLastUpdateDate);

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
          dispatch(setIsDark(isNightPeriodNow(nightPeriod)));
        } else {
          getCurrentLocation().then(location => {
            if (location) {
              const nightPeriod = createNightPeriod(location, now);
              dispatch(setNightPeriod(nightPeriod));
              dispatch(setIsDark(isNightPeriodNow(nightPeriod)));
            } else {
              dispatch(addNotifications(Notification.CanNotGetNightPeriod));
            }
          });
        }
        break;
      case SYSTEM:
        dispatch(setIsDark(isBrowserDarkModeEnabled()));
        break;
    }
  }, [nightPeriod, darkMode, dispatch]);

  return (
    <ConfigProvider theme={createTheme(searchEngine)}>
      <NewTabComponent />
    </ConfigProvider>
  );
};

export default NewTabContainer;
