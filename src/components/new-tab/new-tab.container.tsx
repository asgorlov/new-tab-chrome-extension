import React, { FC, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSunsetTimeByLocation,
  loadDataFromStorage,
  selectDarkMode,
  selectIsDark,
  selectSearchEngine,
  selectSunset,
  setDarkMode,
  setIsDark
} from "../../store/new-tab.slice";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../store/store";
import NewTabComponent from "./new-tab.component";
import { ConfigProvider } from "antd";
import {
  AUTO,
  MANUAL,
  SEARCH_THEMES,
  SYSTEM
} from "../../constants/search-engine.constants";
import { isBrowserDarkModeEnabled } from "../../utils/dark-mode.utils";

const NewTabContainer: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const sunset = useSelector(selectSunset);
  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const searchEngine = useSelector(selectSearchEngine);
  const isDataLoaded =
    isDark !== undefined &&
    searchEngine !== undefined &&
    darkMode !== undefined;

  useLayoutEffect(() => {
    if (!isDataLoaded) {
      document.title = t("tabTitle");
      dispatch(loadDataFromStorage());
    }
  }, [isDataLoaded, dispatch, t]);

  useEffect(() => {
    switch (darkMode) {
      case AUTO:
        const now = new Date();
        const sunsetDate = sunset ? new Date(sunset) : null;
        const sunsetDateCached =
          sunsetDate &&
          sunsetDate.getFullYear() === now.getFullYear() &&
          sunsetDate.getMonth() === now.getMonth() &&
          sunsetDate.getDate() === now.getDate();

        if (sunsetDateCached) {
          dispatch(setIsDark(sunsetDate.getTime() <= now.getTime()));
        } else {
          navigator.geolocation.getCurrentPosition(
            location => {
              const coords = location?.coords;
              if (coords && coords.latitude && coords.longitude) {
                const coordinate = {
                  lat: coords.latitude,
                  lng: coords.longitude
                };
                dispatch(getSunsetTimeByLocation(coordinate));
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
  }, [sunset, darkMode, dispatch]);

  return isDataLoaded ? (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: SEARCH_THEMES[searchEngine]
        }
      }}
    >
      <NewTabComponent
        isDark={isDark}
        darkMode={darkMode}
        searchEngine={searchEngine}
      />
    </ConfigProvider>
  ) : null;
};

export default NewTabContainer;
