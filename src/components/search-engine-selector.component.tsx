import React, {FC, MouseEvent} from "react";
import "../styles/new-tab_selector.css";
import clsx from "clsx";
import {SearchEngineEnum} from "../constants/searchEngine.constants";

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
                    {grey: searchEngine !== SearchEngineEnum.YANDEX}
                )}
                onClick={onClick}
                value={SearchEngineEnum.YANDEX}
            />
        </div>
    );
};

export default SearchEngineSelectorComponent;
