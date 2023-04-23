import React, {FC, MouseEvent} from "react";
import clsx from "clsx";
import {DUCK, GOOGLE, YANDEX} from "../../constants/search-engine.constants";
import i18n from "../../localizations/i18n";

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
                    {grey: searchEngine !== DUCK}
                )}
                onClick={onClick}
                value={DUCK}
            />
            <button
                className={clsx(
                    "new-tab_search-engine-selector-google",
                    {grey: searchEngine !== GOOGLE}
                )}
                onClick={onClick}
                value={GOOGLE}
            />
            <button
                className={clsx(
                    "new-tab_search-engine-selector-yandex",
                    {grey: searchEngine !== YANDEX},
                    {en_local: !i18n.language.includes("ru")}
                )}
                onClick={onClick}
                value={YANDEX}
            />
        </div>
    );
};

export default SearchEngineSelectorComponent;
