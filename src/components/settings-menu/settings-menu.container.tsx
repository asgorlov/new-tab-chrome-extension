import React, { FC, useCallback, useEffect } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import {
  changeLanguage,
  getSunsetTimeByLocation,
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
      const isCached = (): boolean => {
        const now = new Date();
        const sunsetDate = sunset ? new Date(sunset) : null;

        return (
          !!sunsetDate &&
          sunsetDate.getFullYear() === now.getFullYear() &&
          sunsetDate.getMonth() === now.getMonth() &&
          sunsetDate.getDate() === now.getDate()
        );
      };

      if (key.length && !isCached()) {
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
              dispatch(getSunsetTimeByLocation(coordinate));
            } else {
              dispatch(setDarkMode(MANUAL));
            }
          },
          () => dispatch(setDarkMode(MANUAL))
        );
      }
    }
  }, [sunset, darkMode, dispatch]);

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
