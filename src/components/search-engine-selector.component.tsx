import React, {FC, MouseEvent} from "react";
import "../styles/new-tab_selector.css";
import clsx from "clsx";
import {SearchEngineEnum} from "../constants/search-engine.constants";
import i18n from "../localizations/i18n";

interface SearchSelectedComponentProps {
    searchEngine: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
    searchEngine,
    onClick
}) => {
    return (
        <div className="new-tab_search-engine-selector">
            <button
                className={clsx(
                    "new-tab_search-engine-selector-duck",
                    {grey: searchEngine !== SearchEngineEnum.DUCK}
                )}
                onClick={onClick}
                value={SearchEngineEnum.DUCK}
            />
            <button
                className={clsx(
                    "new-tab_search-engine-selector-google",
                    {grey: searchEngine !== SearchEngineEnum.GOOGLE}
                )}
                onClick={onClick}
                value={SearchEngineEnum.GOOGLE}
            />
            <button
                className={clsx(
                    "new-tab_search-engine-selector-yandex",
                    {grey: searchEngine !== SearchEngineEnum.YANDEX},
                    {en_local: i18n.language !== "ru-RU"}
                )}
                onClick={onClick}
                value={SearchEngineEnum.YANDEX}
            />
        </div>
    );
};

export default SearchEngineSelectorComponent;
