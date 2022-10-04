import React, {ChangeEvent, FC} from "react";
import "../styles/new-tab.css";
import SearchEngineComponent from "./search-engine.component";
import DarkModeToggleComponent from "./dark-mode-toggle.component";
import clsx from "clsx";

interface NewTabComponentProps {
    isDarkMode: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NewTabComponent: FC<NewTabComponentProps> = ({
    isDarkMode,
    onChange
}) => {
    return (
        <div className={clsx("new-tab", {dark: isDarkMode})}>
            <DarkModeToggleComponent
                onChange={onChange}
                checked={isDarkMode}
            />
            <SearchEngineComponent
                searchEngine={"yandex"}
                isDarkMode={isDarkMode}
            />
        </div>
    );
};

export default NewTabComponent;
