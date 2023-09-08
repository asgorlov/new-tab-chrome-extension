import React, { FC } from "react";
import clsx from "clsx";
import SettingsMenuContainer from "../settings-menu/settings-menu.container";
import SearchEngineSelectorContainer from "../search-engine-selector/search-engine-selector.container";
import SearchEngineContainer from "../search-engine/search-engine.container";
import UpdateContainer from "../update/update.container";
import { CUSTOM_WALLPAPER } from "../../constants/wallpaper.constants";
import { getImgUrl } from "../../utils/wallpaper.utils";
import TourContextProvider from "../../contexts/tour.context";
import TourComponent from "../tour/tour-component";
import { useSelector } from "react-redux";
import {
  selectCustomWallpaper,
  selectIsDark,
  selectWallpaper
} from "../../store/new-tab/new-tab.selectors";

/**
 * Компонент страницы новой вкладки
 * @category Components
 */
const NewTabComponent: FC = () => {
  const isDark = useSelector(selectIsDark);
  const wallpaper = useSelector(selectWallpaper);
  const customWallpaper = useSelector(selectCustomWallpaper);

  const customBackgroundStyle =
    customWallpaper && wallpaper === CUSTOM_WALLPAPER
      ? {
          backgroundSize: "cover",
          backgroundImage: `url(${getImgUrl(customWallpaper, isDark)})`
        }
      : {};

  return (
    <TourContextProvider>
      <div className={clsx("new-tab", { dark: isDark })}>
        <div
          className={clsx("new-tab-background", wallpaper, { dark: isDark })}
          style={customBackgroundStyle}
        />
        <TourComponent />
        <UpdateContainer />
        <SettingsMenuContainer />
        <SearchEngineContainer />
        <SearchEngineSelectorContainer />
      </div>
    </TourContextProvider>
  );
};

export default NewTabComponent;
