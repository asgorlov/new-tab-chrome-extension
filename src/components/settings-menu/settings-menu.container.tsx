import React, { FC, useCallback } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import {
  changeLanguage,
  getNightPeriodByLocation,
  selectCustomWallpaper,
  selectDarkMode,
  selectIsDark,
  selectSearchEngine,
  selectSearchEngines,
  selectNightPeriod,
  selectWallpaper,
  setCheckForUpdates,
  setCustomWallpaper,
  setDarkMode,
  setIsDark,
  setSearchEngines,
  setWallpaper,
  selectCheckForUpdates,
  selectCheckLoading,
  checkUpdates,
  selectLastVersion,
  selectShowUpdateMessage
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { isSunsetTimeCached } from "../../utils/dark-mode.utils";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";

const SettingsMenuContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const wallpaper = useSelector(selectWallpaper);
  const checkMode = useSelector(selectCheckForUpdates);
  const showMessage = useSelector(selectShowUpdateMessage);
  const lastVersion = useSelector(selectLastVersion);
  const nightPeriod = useSelector(selectNightPeriod);
  const checkLoading = useSelector(selectCheckLoading);
  const searchEngine = useSelector(selectSearchEngine);
  const customWallpaper = useSelector(selectCustomWallpaper);
  const searchEngineNames = useSelector(selectSearchEngines);

  const manualCheckUpdates = useCallback(
    () => dispatch(checkUpdates()),
    [dispatch]
  );

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
      if (key.length && !isSunsetTimeCached(nightPeriod)) {
        navigator.geolocation.getCurrentPosition(location => {
          const coords = location?.coords;
          if (coords && coords.latitude && coords.longitude) {
            const coordinate = {
              lat: coords.latitude,
              lng: coords.longitude
            };
            dispatch(getNightPeriodByLocation(coordinate));
          }
        });
      }
    },
    [nightPeriod, dispatch]
  );

  return (
    <SettingsMenuComponent
      searchEngineNames={searchEngineNames}
      customWallpaper={customWallpaper}
      searchEngine={searchEngine}
      checkLoading={checkLoading}
      lastVersion={lastVersion}
      showMessage={showMessage}
      wallpaper={wallpaper}
      checkMode={checkMode}
      darkMode={darkMode}
      isDark={isDark}
      setWallpaper={changeWallpaper}
      onClickUpdates={manualCheckUpdates}
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
