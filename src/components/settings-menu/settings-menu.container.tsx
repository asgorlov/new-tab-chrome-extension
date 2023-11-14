import React, { FC, useCallback } from "react";
import SettingsMenuComponent from "./settings-menu.component";
import { setIsOpenMenu } from "../../store/new-tab/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  selectIsDark,
  selectIsOpenMenu,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";

const SettingsMenuContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useSelector(selectIsDark);
  const isOpenMenu = useSelector(selectIsOpenMenu);
  const searchEngine = useSelector(selectSearchEngine);

  const changeIsOpenMenu = useCallback(
    (v: boolean) => dispatch(setIsOpenMenu(v)),
    [dispatch]
  );

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
