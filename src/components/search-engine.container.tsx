import React, {FC} from "react";
import SearchEngineComponent from "./search-engine.component";
import getLanguage from "../utils/localization.util";

const SearchEngineContainer: FC = () => {
    return <SearchEngineComponent
        searchEngine={"yandex"}
        localization={getLanguage()}
    />
};

export default SearchEngineContainer;
