import React, { FC } from "react";
import clsx from "clsx";
import DarkModeContainer from "../dark-mode/dark-mode.container";
import SearchEngineSelectorContainer from "../search-engine-selector/search-engine-selector.container";
import SearchEngineContainer from "../search-engine/search-engine.container";

interface NewTabComponentProps {
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
}

const NewTabComponent: FC<NewTabComponentProps> = ({
  isDark,
  darkMode,
  searchEngine
}) => {
  return (
    <div className={clsx("new-tab", { dark: isDark })}>
      <DarkModeContainer
        isDark={isDark}
        darkMode={darkMode}
        searchEngine={searchEngine}
      />
      <SearchEngineSelectorContainer searchEngine={searchEngine} />
      <SearchEngineContainer isDark={isDark} searchEngine={searchEngine} />
    </div>
  );
};

export default NewTabComponent;
