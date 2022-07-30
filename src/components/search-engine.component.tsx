import React, {FC} from "react";
import {useTranslation} from 'react-i18next';
import "../styles/yandex-search-engine.css";
import {SEARCH_ENGINE_LINKS, SEARCH_QUERY_LINKS} from "../constants/link.constants";

interface SearchEngineProps {
    searchEngine: string
    logo: string
}

const SearchEngineComponent: FC<SearchEngineProps> = ({
    searchEngine,
    logo
}) => {
    const {t} = useTranslation();
    document.title = t("newTab");

    return (<div className={`${searchEngine}_search_engine`}>
            <a href={SEARCH_ENGINE_LINKS[searchEngine]}>
                <div className={`${searchEngine}_${logo}`}></div>
            </a>
            <form className={`${searchEngine}_search_form`}
                  action={SEARCH_QUERY_LINKS[searchEngine]}>
                <div className={`${searchEngine}_search_input`}>
                    <input className={`${searchEngine}_search_input_control`}
                           placeholder={t("searchQuery")}
                           tabIndex={2}
                           autoComplete="off"
                           maxLength={400}
                           name="text"/>
                </div>
                <div className={`${searchEngine}_search_button`}>
                    <button className={`${searchEngine}_search_button_theme`}
                            tabIndex={1} type="submit">
                        <span className={`${searchEngine}_search_button_text`}>
                            {t("searchButton")}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchEngineComponent;
