import React, {FC} from "react";
import SearchEngineComponent from "./search-engine.component";
import {selectLocalization} from "../store/localization.reducer";
import {useSelector} from "react-redux";
import {selectDarkMode} from "../store/dark-mode.reducer";
import {LOCALIZED_TITLE} from "../constants/localization.constants";

const SearchEngineContainer: FC = () => {
    const lang = useSelector(selectLocalization);
    const isDarkMode = useSelector(selectDarkMode);
    const logotype = isDarkMode ? "logo dark" : "logo";

    document.title = LOCALIZED_TITLE[lang];

    return <SearchEngineComponent
        searchEngine={"yandex"}
        localization={lang}
        logo={logotype}
    />
};

export default SearchEngineContainer;
