import React, { FC } from "react";
import clsx from "clsx";
import SettingsMenuContainer from "../settings-menu/settings-menu.container";
import SearchEngineSelectorContainer from "../search-engine-selector/search-engine-selector.container";
import SearchEngineContainer from "../search-engine/search-engine.container";
import UpdateContainer from "../update/update.container";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { CUSTOM_WALLPAPER } from "../../constants/wallpaper.constants";
import { getImgUrl } from "../../utils/wallpaper.utils";
import TourContextProvider from "../../contexts/tour.context";
import TourComponent from "../tour/tour-component";

/**
 * Передаваемые параметры для компонента страницы новой вкладки
 * @property isDark - Флаг темной темы
 * @property showTour - Флаг ознакомительного тура
 * @property wallpaper - Название фона приложения
 * @property customWallpaper - Пользовательские фоны
 * @interface
 */
export interface NewTabComponentProps {
  isDark: boolean;
  showTour: boolean;
  wallpaper: string;
  customWallpaper: CustomWallpaper | null;
}

/**
 * Компонент страницы новой вкладки
 * @category Components
 */
const NewTabComponent: FC<NewTabComponentProps> = ({
  isDark,
  showTour,
  wallpaper,
  customWallpaper
}) => {
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
        <TourComponent showTour={showTour} />
        <UpdateContainer />
        <SettingsMenuContainer />
        <SearchEngineContainer />
        <SearchEngineSelectorContainer />
      </div>
    </TourContextProvider>
  );
};

export default NewTabComponent;
