import React, { FC, MouseEvent } from "react";
import SearchEngineComponent from "./search-engine.component";
import clsx from "clsx";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import DarkModeContainer from "../dark-mode/dark-mode.container";

interface NewTabComponentProps {
  isDark: boolean;
  darkMode: string;
  searchEngine: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NewTabComponent: FC<NewTabComponentProps> = ({
  isDark,
  darkMode,
  searchEngine,
  onClick
}) => {
  return (
    <div className={clsx("new-tab", { dark: isDark })}>
      <DarkModeContainer
        isDark={isDark}
        darkMode={darkMode}
        searchEngine={searchEngine}
      />
      <SearchEngineSelectorComponent
        onClick={onClick}
        searchEngine={searchEngine}
      />
      <SearchEngineComponent isDark={isDark} searchEngine={searchEngine} />
    </div>
  );
};

export default NewTabComponent;
