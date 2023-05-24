import React, { FC, useCallback, useEffect } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import {
  changeLanguage,
  getDarkByLocationTime,
  selectSearchEngines,
  selectSunset,
  setDarkMode,
  setIsDark,
  setSearchEngines
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { AUTO, MANUAL } from "../../constants/search-engine.constants";

interface DarkModeContainerProps {
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
}

const SettingsMenuContainer: FC<DarkModeContainerProps> = ({
  isDark,
  darkMode,
  searchEngine
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sunset = useSelector(selectSunset);
  const searchEngineNames = useSelector(selectSearchEngines);

  const toggleDarkHandler = useCallback(
    () => dispatch(setIsDark(!isDark)),
    [isDark, dispatch]
  );

  const changeSearchEngines = useCallback(
    (v: string[]) => dispatch(setSearchEngines(v)),
    [dispatch]
  );

  const changeDarkModeHandler = useCallback(
    (v: string) => dispatch(setDarkMode(v)),
    [dispatch]
  );

  const changeLanguageHandler = useCallback(
    (v: string) => dispatch(changeLanguage(v)),
    [dispatch]
  );

  const changeDarkModeBySunsetTime = useCallback(() => {
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
  }, [dispatch, sunset]);

  useEffect(() => {
    if (darkMode === AUTO) {
      changeDarkModeBySunsetTime();
    }
  }, [darkMode, changeDarkModeBySunsetTime]);

  return (
    <SettingsMenuComponent
      searchEngineNames={searchEngineNames}
      searchEngine={searchEngine}
      darkMode={darkMode}
      isDark={isDark}
      onClickSwitcher={toggleDarkHandler}
      onChangeDarkMode={changeDarkModeHandler}
      onChangeLanguage={changeLanguageHandler}
      onChangeSearchEngines={changeSearchEngines}
      changeDarkModeBySunsetTime={changeDarkModeBySunsetTime}
    />
  );
};

export default SettingsMenuContainer;
