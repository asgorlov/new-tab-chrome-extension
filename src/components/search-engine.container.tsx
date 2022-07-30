import React, {FC} from "react";
import SearchEngineComponent from "./search-engine.component";
import {useSelector} from "react-redux";
import {selectDarkMode} from "../store/dark-mode.reducer";
import i18next from "i18next";

const SearchEngineContainer: FC = () => {
    const lang = i18next.language;
    const isDarkMode = useSelector(selectDarkMode);

    let logotype = isDarkMode ? "logo dark" : "logo";
    if (lang !== "ru-RU") {
        logotype = logotype + " en_local"
    }

    return <SearchEngineComponent
        searchEngine={"yandex"}
        logo={logotype}
    />
};

export default SearchEngineContainer;
