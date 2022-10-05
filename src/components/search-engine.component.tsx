import React, {FC} from "react";
import {useTranslation} from 'react-i18next';
import "../styles/new-tab_yandex.css";
import "../styles/new-tab_google.css";
import "../styles/new-tab_duckduck.css";
import {SEARCH_ENGINE_LINKS, SEARCH_QUERY_LINKS} from "../constants/link.constants";
import clsx from "clsx";
import i18n from "../localizations/i18n";
import {SearchEngineEnum} from "../constants/search-engine.constants";

interface SearchEngineProps {
    searchEngine: string;
    isDarkMode: boolean;
}

const SearchEngineComponent: FC<SearchEngineProps> = ({
                                                          searchEngine,
                                                          isDarkMode
                                                      }) => {
    const {t} = useTranslation();

    return (<div className={`new-tab_${searchEngine}-search-engine`}>
            <a href={SEARCH_ENGINE_LINKS[searchEngine]}>
                <div className={clsx(
                    `new-tab_${searchEngine}-logo`,
                    {dark: isDarkMode},
                    {en_local: i18n.language !== "ru-RU"})}
                />
            </a>
            <form
                className={clsx(`new-tab_${searchEngine}-search-form`, {shadow_dark: isDarkMode})}
                action={SEARCH_QUERY_LINKS[searchEngine]}>
                <div className={`new-tab_${searchEngine}-search-input`}>
                    <input className={`new-tab_${searchEngine}-search-input-control`}
                           placeholder={t("searchQuery")}
                           tabIndex={2}
                           autoComplete="off"
                           maxLength={400}
                           name="text"
                    />
                </div>
                <div className={`new-tab_${searchEngine}-search-button`}>
                    <button className={`new-tab_${searchEngine}-search-button-theme`}
                            tabIndex={1} type="submit">
                        <div className={`new-tab_${searchEngine}-search-button-text`}>
                            {searchEngine === SearchEngineEnum.YANDEX && t("searchButton")}
                            {searchEngine === SearchEngineEnum.DUCK && "S"}
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchEngineComponent;
