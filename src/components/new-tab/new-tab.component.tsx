import React, { FC } from "react";
import clsx from "clsx";
import SettingsMenuContainer from "../settings-menu/settings-menu.container";
import SearchEngineSelectorContainer from "../search-engine-selector/search-engine-selector.container";
import SearchEngineContainer from "../search-engine/search-engine.container";
import { getImgUrl } from "../../utils/wallpaper.utils";
import TourContextProvider from "../../contexts/tour.context";
import TourComponent from "../tour/tour.component";
import { useSelector } from "react-redux";
import {
  selectCustomWallpaper,
  selectIsDark,
  selectWallpaper
} from "../../store/new-tab/new-tab.selectors";
import NotificationComponent from "../notification/notification.component";

/**
 * Компонент страницы новой вкладки
 * @category Components
 */
const NewTabComponent: FC = () => {
  const isDark = useSelector(selectIsDark);
  const wallpaper = useSelector(selectWallpaper);
  const customWallpaper = useSelector(selectCustomWallpaper);

  const getBackgroundStyle = () => {
    const url = getImgUrl(customWallpaper, wallpaper, isDark);
    return url ? { backgroundImage: `url(${url})` } : {};
  };

  return (
    <TourContextProvider>
      <div className={clsx("new-tab", { dark: isDark })}>
        <div
          className={clsx("new-tab-background", wallpaper)}
          style={getBackgroundStyle()}
        />
        <TourComponent />
        <NotificationComponent />
        <SettingsMenuContainer />
        <SearchEngineContainer />
        <SearchEngineSelectorContainer />
      </div>
    </TourContextProvider>
  );
};

export default NewTabComponent;
