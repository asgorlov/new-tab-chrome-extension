import React, { FC, useCallback, useEffect } from "react";
import DarkModeComponent from "./dark-mode.component";
import {
  getDarkByLocationTime,
  selectSunset,
  setDarkMode,
  setIsDark
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { AUTO, MANUAL } from "../../constants/search-engine.constants";

interface DarkModeContainerProps {
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
}

const DarkModeContainer: FC<DarkModeContainerProps> = ({
  isDark,
  darkMode,
  searchEngine
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sunset = useSelector(selectSunset);

  useEffect(() => {
    if (darkMode === AUTO) {
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
              dispatch(getDarkByLocationTime(coordinate));
            } else {
              dispatch(setDarkMode(MANUAL));
            }
          },
          () => dispatch(setDarkMode(MANUAL))
        );
      }
    }
  }, [darkMode, sunset, dispatch]);

  const toggleDarkHandler = useCallback(
    () => dispatch(setIsDark(!isDark)),
    [isDark, dispatch]
  );

  const changeDarkModeHandler = useCallback(
    (v: string) => dispatch(setDarkMode(v)),
    [dispatch]
  );

  const getPopupContainer = useCallback(
    (node: HTMLElement) => node.parentElement ?? document.body,
    []
  );

  return (
    <DarkModeComponent
      darkMode={darkMode}
      isDark={isDark}
      onClickSwitcher={toggleDarkHandler}
      onChangeDarkMode={changeDarkModeHandler}
      getPopupContainer={getPopupContainer}
      searchEngine={searchEngine}
    />
  );
};

export default DarkModeContainer;
