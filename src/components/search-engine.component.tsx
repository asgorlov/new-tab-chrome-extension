import React, {FC} from "react";
import {useTranslation} from 'react-i18next';
import {DUCK, SEARCH_ENGINE_LINKS, SEARCH_QUERY_LINKS, YANDEX} from "../constants/search-engine.constants";
import clsx from "clsx";
import i18n from "../localizations/i18n";

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
            <div className={clsx(
                `new-tab_${searchEngine}-logo`,
                {en_local: !i18n.language.includes("ru")},
                {dark: isDarkMode})}
            >
                <a className={`new-tab_${searchEngine}-search-link`} href={SEARCH_ENGINE_LINKS[searchEngine]}>
                </a>
            </div>
            <form
                className={clsx(`new-tab_${searchEngine}-search-form`, {shadow_dark: isDarkMode})}
                action={SEARCH_QUERY_LINKS[searchEngine]}>
                <div className={`new-tab_${searchEngine}-search-input`}>
                    <input className={`new-tab_${searchEngine}-search-input-control`}
                           placeholder={t("searchQuery")}
                           tabIndex={2}
                           autoComplete="off"
                           maxLength={400}
                           name={searchEngine === YANDEX ? "text" : "q"}
                    />
                </div>
                <div className={`new-tab_${searchEngine}-search-button`}>
                    <button className={`new-tab_${searchEngine}-search-button-theme`}
                            tabIndex={1} type="submit">
                        <div className={`new-tab_${searchEngine}-search-button-text`}>
                            {searchEngine === YANDEX && t("searchButton")}
                            {searchEngine === DUCK && "S"}
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchEngineComponent;
