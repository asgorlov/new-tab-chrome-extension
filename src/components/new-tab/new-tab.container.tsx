import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setIsDark } from "../../store/new-tab/new-tab.slice";
import { AppDispatch } from "../../store/store";
import NewTabComponent from "./new-tab.component";
import { ConfigProvider } from "antd";
import { AUTO, MANUAL, SYSTEM } from "../../constants/search-engine.constants";
import { isBrowserDarkModeEnabled } from "../../utils/dark-mode.utils";
import {
  selectCheckForUpdates,
  selectDarkMode,
  selectLastUpdateDate,
  selectNightPeriod,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";
import {
  checkUpdates,
  getNightPeriodByLocation
} from "../../store/new-tab/new-tab.thunks";
import { shouldBeCheck } from "../../utils/update.utils";
import { createTheme } from "../../utils/search-engine.utils";

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
        const sunset = nightPeriod.sunset ? new Date(nightPeriod.sunset) : null;
        const sunrise = nightPeriod.sunrise
          ? new Date(nightPeriod.sunrise)
          : null;
        const nightPeriodCached =
          sunset && sunrise && sunrise.toDateString() === now.toDateString();

        if (nightPeriodCached) {
          const isNightPeriod =
            sunrise.getTime() >= now.getTime() ||
            sunset.getTime() <= now.getTime();
          dispatch(setIsDark(isNightPeriod));
        } else {
          navigator.geolocation.getCurrentPosition(
            location => {
              const coords = location?.coords;
              if (coords && coords.latitude && coords.longitude) {
                const coordinate = {
                  lat: coords.latitude,
                  lng: coords.longitude
                };
                dispatch(getNightPeriodByLocation(coordinate));
              } else {
                dispatch(setDarkMode(MANUAL));
              }
            },
            () => dispatch(setDarkMode(MANUAL))
          );
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
