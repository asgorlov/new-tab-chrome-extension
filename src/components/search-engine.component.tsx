import React, {FC} from 'react';
import "../styles/search-engine.css"
import {SEARCH_ENGINE_LINKS, SEARCH_QUERY_LINKS} from "../constants/links-constants";
import {LOCALIZED_SEARCH_BUTTON, LOCALIZED_SEARCH_QUERY} from "../constants/localization-constants";

interface SearchEngineProps {
    searchEngine: string
    localization: string
}

const SearchEngineComponent: FC<SearchEngineProps> = ({searchEngine, localization}) => {
    let searchEngineLink = SEARCH_ENGINE_LINKS.get(searchEngine);
    let searchQueryLink = SEARCH_QUERY_LINKS.get(searchEngine);
    let searchQueryPlaceholder = LOCALIZED_SEARCH_QUERY.get(localization);
    let searchButtonInnerText = LOCALIZED_SEARCH_BUTTON.get(localization);

    return (<div className="search_engine">
            <a href={searchEngineLink}>
                <div className="ya_logo" id="ya-logo"></div>
            </a>
            <form className="search_form" action={searchQueryLink}>
                <div className="search_input">
                    <input className="search_input_control"
                           placeholder={searchQueryPlaceholder}
                           tabIndex={2}
                           autoComplete="off"
                           maxLength={400}
                           name="text"/>
                </div>
                <div className="search_button">
                    <button className="search_button_theme" tabIndex={1} type="submit">
                        <span className="search_button_text">{searchButtonInnerText}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchEngineComponent;
