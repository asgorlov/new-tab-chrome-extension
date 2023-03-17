import React, {FC, MouseEvent, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    loadDataFromStorage, selectDarkMode,
    selectIsDark,
    selectSearchEngine,
    setSearchEngine
} from "../../store/new-tab.slice";
import {useTranslation} from "react-i18next";
import {AppDispatch} from "../../store/store";
import NewTabComponent from "./new-tab.component";

const NewTabContainer: FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const isDark = useSelector(selectIsDark);
    const darkMode = useSelector(selectDarkMode);
    const searchEngine = useSelector(selectSearchEngine);

    useEffect(() => {
        document.title = t("tabTitle");
        dispatch(loadDataFromStorage());
    }, [dispatch, t]);

    const buttonClickHandler = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const target = e.target as HTMLButtonElement;
            dispatch(setSearchEngine(target.value));

            if (chrome?.storage) {
                chrome.storage.sync.set({searchEngine: target.value});
            }
        }, [dispatch]);

    if (isDark === undefined || searchEngine === undefined || darkMode === undefined) {
        return null;
    }

    return (
        <NewTabComponent
            isDark={isDark}
            darkMode={darkMode}
            searchEngine={searchEngine}
            onClick={buttonClickHandler}
        />
    );
};

export default NewTabContainer;
