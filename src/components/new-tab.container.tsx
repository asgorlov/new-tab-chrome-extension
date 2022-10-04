import React, {ChangeEvent, FC, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadDataFromStorage, offCheckbox, onCheckbox, selectDarkMode} from "../store/dark-mode.slice";
import {useTranslation} from "react-i18next";
import {AppDispatch} from "../store/store";
import NewTabComponent from "./new-tab.component";

const NewTabContainer: FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector(selectDarkMode);

    useEffect(() => {
        document.title = t("tabTitle");
        dispatch(loadDataFromStorage());
    }, [dispatch, t]);

    const checkboxChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(e.target.checked ? onCheckbox() : offCheckbox());
            if (chrome?.storage) {
                chrome.storage.sync.set({isDarkMode: e.target.checked});
            }
        }, [dispatch]
    );

    return (
        isDarkMode !== undefined
            ? <NewTabComponent isDarkMode={isDarkMode} onChange={checkboxChangeHandler}/>
            : <></>
    );
};

export default NewTabContainer;
