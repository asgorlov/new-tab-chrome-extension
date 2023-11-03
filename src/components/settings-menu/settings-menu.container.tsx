import React, { FC, useCallback, useEffect } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import { setIsOpenMenu } from "../../store/new-tab/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useTourContext } from "../../contexts/tour.context";
import {
  selectIsDark,
  selectIsOpenMenu,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";
import { SETTINGS_MENU_CONTENT_CLASS } from "../../constants/settings-menu.constants";

const SettingsMenuContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tourCtx = useTourContext();
  const isDark = useSelector(selectIsDark);
  const isOpenMenu = useSelector(selectIsOpenMenu);
  const searchEngine = useSelector(selectSearchEngine);

  const changeIsOpenMenu = useCallback(
    (v: boolean) => dispatch(setIsOpenMenu(v)),
    [dispatch]
  );

  useEffect(() => {
    if (tourCtx) {
      tourCtx.settingsMenuContentClass = `.${SETTINGS_MENU_CONTENT_CLASS}`;
    }
  }, [tourCtx]);

  return (
    <SettingsMenuComponent
      setIsOpenMenu={changeIsOpenMenu}
      searchEngine={searchEngine}
      isOpenMenu={isOpenMenu}
      menuClass="new-tab__settings-menu"
      isDark={isDark}
    />
  );
};

export default SettingsMenuContainer;
