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
    return (<div className={`${searchEngine}_search_engine`}>
            <a href={SEARCH_ENGINE_LINKS[searchEngine]}>
                <div className={`${searchEngine}_${logo}`}></div>
            </a>
            <form className={`${searchEngine}_search_form`}
                  action={SEARCH_QUERY_LINKS[searchEngine]}>
                <div className={`${searchEngine}_search_input`}>
                    <input className={`${searchEngine}_search_input_control`}
                           placeholder={LOCALIZED_SEARCH_QUERY[localization]}
                           tabIndex={2}
                           autoComplete="off"
                           maxLength={400}
                           name="text"/>
                </div>
                <div className={`${searchEngine}_search_button`}>
                    <button className={`${searchEngine}_search_button_theme`}
                            tabIndex={1} type="submit">
                        <span className={`${searchEngine}_search_button_text`}>
                            {LOCALIZED_SEARCH_BUTTON[localization]}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchEngineComponent;
