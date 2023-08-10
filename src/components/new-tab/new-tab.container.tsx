import React, { FC, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setIsDark } from "../../store/new-tab/new-tab.slice";
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
import { useTranslation } from "react-i18next";
import {
  selectCustomWallpaper,
  selectDarkMode,
  selectIsDark,
  selectNightPeriod,
  selectSearchEngine,
  selectShowTour,
  selectWallpaper
} from "../../store/new-tab/new-tab.selectors";
import { getNightPeriodByLocation } from "../../store/new-tab/new-tab.thunks";

const NewTabContainer: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const showTour = useSelector(selectShowTour);
  const wallpaper = useSelector(selectWallpaper);
  const nightPeriod = useSelector(selectNightPeriod);
  const searchEngine = useSelector(selectSearchEngine);
  const customWallpaper = useSelector(selectCustomWallpaper);

  useLayoutEffect(() => {
    document.title = t("tabTitle");
  }, [t]);

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: SEARCH_THEMES[searchEngine]
        }
      }}
    >
      <NewTabComponent
        isDark={isDark}
        showTour={showTour}
        wallpaper={wallpaper}
        customWallpaper={customWallpaper}
      />
    </ConfigProvider>
  );
};

export default NewTabContainer;
