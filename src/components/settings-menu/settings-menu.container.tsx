import React, { FC, useCallback, useContext, useEffect } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import { setIsOpenMenu } from "../../store/new-tab/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { TourContext } from "../../contexts/tour.context";
import {
  selectIsDark,
  selectIsOpenMenu,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";

const SettingsMenuContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tourCtx = useContext(TourContext);
  const isDark = useSelector(selectIsDark);
  const isOpenMenu = useSelector(selectIsOpenMenu);
  const searchEngine = useSelector(selectSearchEngine);

  const menuContainerClass = "new-tab__settings-menu-container";

  const changeIsOpenMenu = useCallback(
    (v: boolean) => dispatch(setIsOpenMenu(v)),
    [dispatch]
  );

  useEffect(() => {
    if (tourCtx) {
      tourCtx.settingsMenuContainerClass = `.${menuContainerClass}`;
    }
  }, [tourCtx]);

  return (
    <SettingsMenuComponent
      menuContainerClass={menuContainerClass}
      setIsOpenMenu={changeIsOpenMenu}
      searchEngine={searchEngine}
      isOpenMenu={isOpenMenu}
      menuClass="new-tab__settings-menu"
      isDark={isDark}
    />
  );
};

export default SettingsMenuContainer;
