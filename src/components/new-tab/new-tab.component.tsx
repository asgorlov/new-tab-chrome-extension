import React, { FC } from "react";
import clsx from "clsx";
import SettingsMenuContainer from "../settings-menu/settings-menu.container";
import SearchEngineSelectorContainer from "../search-engine-selector/search-engine-selector.container";
import SearchEngineContainer from "../search-engine/search-engine.container";

interface NewTabComponentProps {
  isDark: boolean;
}

const NewTabComponent: FC<NewTabComponentProps> = ({ isDark }) => {
  return (
    <div className={clsx("new-tab", { dark: isDark })}>
      <SettingsMenuContainer />
      <SearchEngineContainer />
      <SearchEngineSelectorContainer />
    </div>
  );
};

export default NewTabComponent;
