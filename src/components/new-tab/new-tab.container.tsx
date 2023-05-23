import React, { FC, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDataFromStorage,
  selectDarkMode,
  selectIsDark,
  selectSearchEngine
} from "../../store/new-tab.slice";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../store/store";
import NewTabComponent from "./new-tab.component";
import { ConfigProvider } from "antd";
import { SEARCH_THEMES } from "../../constants/search-engine.constants";

const NewTabContainer: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector(selectIsDark);
  const darkMode = useSelector(selectDarkMode);
  const searchEngine = useSelector(selectSearchEngine);
  const isDataLoaded =
    isDark !== undefined &&
    searchEngine !== undefined &&
    darkMode !== undefined;

  useLayoutEffect(() => {
    if (!isDataLoaded) {
      document.title = t("tabTitle");
      dispatch(loadDataFromStorage());
    }
  }, [isDataLoaded, dispatch, t]);

  return isDataLoaded ? (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: SEARCH_THEMES[searchEngine]
        }
      }}
    >
      <NewTabComponent
        isDark={isDark}
        darkMode={darkMode}
        searchEngine={searchEngine}
      />
    </ConfigProvider>
  ) : null;
};

export default NewTabContainer;
