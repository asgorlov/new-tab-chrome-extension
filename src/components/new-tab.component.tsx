import React, {ChangeEvent, FC, MouseEvent} from "react";
import "../styles/new-tab.css";
import SearchEngineComponent from "./search-engine.component";
import DarkModeToggleComponent from "./dark-mode-toggle.component";
import clsx from "clsx";
import SearchEngineSelectorComponent from "./search-engine-selector.component";

interface NewTabComponentProps {
    isDarkMode: boolean;
    searchEngine: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NewTabComponent: FC<NewTabComponentProps> = ({
    isDarkMode,
    searchEngine,
    onChange,
    onClick
}) => {
    return (
        <div className={clsx("new-tab", {dark: isDarkMode})}>
            <DarkModeToggleComponent
                onChange={onChange}
                checked={isDarkMode}
            />
            <SearchEngineSelectorComponent
                onClick={onClick}
                searchEngine={searchEngine}
            />
            <SearchEngineComponent
                isDarkMode={isDarkMode}
                searchEngine={searchEngine}
            />
        </div>
    );
};

export default NewTabComponent;
