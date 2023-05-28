import React, { FC, useCallback } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import {
  changeLanguage,
  getSunsetTimeByLocation,
  selectDarkMode,
  selectIsDark,
  selectSearchEngine,
  selectSearchEngines,
  selectSunset,
  setDarkMode,
  setIsDark,
  setSearchEngines
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { isSunsetTimeCached } from "../../utils/dark-mode.utils";

const SettingsMenuContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sunset = useSelector(selectSunset);
  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const searchEngine = useSelector(selectSearchEngine);
  const searchEngineNames = useSelector(selectSearchEngines);

  const toggleDarkHandler = useCallback(
    () => dispatch(setIsDark(!isDark)),
    [isDark, dispatch]
  );

  const changeSearchEnginesHandler = useCallback(
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

  const changeDarkModeCollapseHandler = useCallback(
    (key: string | string[]) => {
      if (key.length && !isSunsetTimeCached(sunset)) {
        navigator.geolocation.getCurrentPosition(location => {
          const coords = location?.coords;
          if (coords && coords.latitude && coords.longitude) {
            const coordinate = {
              lat: coords.latitude,
              lng: coords.longitude
            };
            dispatch(getSunsetTimeByLocation(coordinate));
          }
        });
      }
    },
    [sunset, dispatch]
  );

  return (
    <SettingsMenuComponent
      searchEngineNames={searchEngineNames}
      searchEngine={searchEngine}
      darkMode={darkMode}
      isDark={isDark}
      onClickSwitcher={toggleDarkHandler}
      onChangeDarkMode={changeDarkModeHandler}
      onChangeLanguage={changeLanguageHandler}
      onChangeSearchEngines={changeSearchEnginesHandler}
      onChangeDarkModeCollapse={changeDarkModeCollapseHandler}
    />
  );
};

export default SettingsMenuContainer;
