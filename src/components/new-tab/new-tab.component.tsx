import React, { FC } from "react";
import clsx from "clsx";
import SettingsMenuContainer from "../settings-menu/settings-menu.container";
import SearchEngineSelectorContainer from "../search-engine-selector/search-engine-selector.container";
import SearchEngineContainer from "../search-engine/search-engine.container";
import UpdateContainer from "../update/update.container";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import { CUSTOM_WALLPAPER } from "../../constants/wallpaper.constants";
import { getImgUrl } from "../../utils/wallpaper.utils";

interface NewTabComponentProps {
  isDark: boolean;
  wallpaper: string;
  customWallpaper: CustomWallpaper | null;
}

const NewTabComponent: FC<NewTabComponentProps> = ({
  isDark,
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
    <>
      <div className={clsx("new-tab", { dark: isDark })}>
        <div
          className={clsx("new-tab-background", wallpaper, { dark: isDark })}
          style={customBackgroundStyle}
        />
        <UpdateContainer />
        <SettingsMenuContainer />
        <SearchEngineContainer />
        <SearchEngineSelectorContainer />
      </div>
    </>
  );
};

export default NewTabComponent;
