import React, {FC} from "react";
import "../styles/yandex-search-engine.css"
import {SEARCH_ENGINE_LINKS, SEARCH_QUERY_LINKS} from "../constants/link.constants";
import {LOCALIZED_SEARCH_BUTTON, LOCALIZED_SEARCH_QUERY} from "../constants/localization.constants";

interface SearchEngineProps {
    searchEngine: string
    localization: string
    logo: string
}

const SearchEngineComponent: FC<SearchEngineProps> = ({
                                                          searchEngine,
                                                          localization,
                                                          logo
}) => {
    const searchEngineLink = SEARCH_ENGINE_LINKS[searchEngine];
    const searchQueryLink = SEARCH_QUERY_LINKS[searchEngine];
    const searchQueryPlaceholder = LOCALIZED_SEARCH_QUERY[localization];
    const searchButtonInnerText = LOCALIZED_SEARCH_BUTTON[localization];

    return (<div className={`${searchEngine}_search_engine`}>
            <a href={searchEngineLink}>
                <div className={`${searchEngine}_${logo}`}></div>
            </a>
            <form className={`${searchEngine}_search_form`} action={searchQueryLink}>
                <div className={`${searchEngine}_search_input`}>
                    <input className={`${searchEngine}_search_input_control`}
                           placeholder={searchQueryPlaceholder}
                           tabIndex={2}
                           autoComplete="off"
                           maxLength={400}
                           name="text"/>
                </div>
                <div className={`${searchEngine}_search_button`}>
                    <button className={`${searchEngine}_search_button_theme`}
                            tabIndex={1} type="submit">
                        <span className={`${searchEngine}_search_button_text`}>
                            {searchButtonInnerText}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchEngineComponent;
