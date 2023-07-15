import React, { FC, useCallback } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import {
  changeLanguage,
  getSunsetTimeByLocation,
  selectCustomWallpaper,
  selectDarkMode,
  selectIsDark,
  selectSearchEngine,
  selectSearchEngines,
  selectSunset,
  selectWallpaper,
  setCheckForUpdates,
  setCustomWallpaper,
  setDarkMode,
  setIsDark,
  setSearchEngines,
  setWallpaper
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { isSunsetTimeCached } from "../../utils/dark-mode.utils";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";

const SettingsMenuContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sunset = useSelector(selectSunset);
  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const wallpaper = useSelector(selectWallpaper);
  const searchEngine = useSelector(selectSearchEngine);
  const customWallpaper = useSelector(selectCustomWallpaper);
  const searchEngineNames = useSelector(selectSearchEngines);

  const changeWallpaper = useCallback(
    (v: string) => dispatch(setWallpaper(v)),
    [dispatch]
  );

  const changeCustomWallpaper = useCallback(
    (v: CustomWallpaper | null) => dispatch(setCustomWallpaper(v)),
    [dispatch]
  );

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

  const changeCheckForUpdatesHandler = useCallback(
    (v: string) => dispatch(setCheckForUpdates(v)),
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
      customWallpaper={customWallpaper}
      searchEngine={searchEngine}
      wallpaper={wallpaper}
      darkMode={darkMode}
      isDark={isDark}
      setWallpaper={changeWallpaper}
      setCustomWallpaper={changeCustomWallpaper}
      onClickSwitcher={toggleDarkHandler}
      onChangeDarkMode={changeDarkModeHandler}
      onChangeLanguage={changeLanguageHandler}
      onChangeSearchEngines={changeSearchEnginesHandler}
      onChangeCheckForUpdates={changeCheckForUpdatesHandler}
      onChangeDarkModeCollapse={changeDarkModeCollapseHandler}
    />
  );
};

export default SettingsMenuContainer;
