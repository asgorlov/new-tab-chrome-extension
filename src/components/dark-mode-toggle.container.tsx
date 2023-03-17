import React, {ChangeEvent, FC, useCallback, useEffect} from "react";
import DarkModeToggleComponent from "./dark-mode-toggle.component";
import {getDarkByLocationTime, setDarkMode, setIsDark} from "../store/new-tab.slice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {AUTO, MANUAL} from "../constants/search-engine.constants";

interface DarkModeToggleContainerProps {
    isDark: boolean;
    darkMode: string;
    searchEngine: string;
}

const DarkModeToggleContainer: FC<DarkModeToggleContainerProps> = ({
    isDark,
    darkMode,
    searchEngine
}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (darkMode === AUTO) {
            navigator.geolocation.getCurrentPosition(location => {
                const coords = location?.coords;
                if (coords && coords.latitude && coords.longitude) {
                    const coordinate = {
                        lat: coords.latitude,
                        lng: coords.longitude
                    };
                    dispatch(getDarkByLocationTime(coordinate));
                } else {
                    dispatch(setDarkMode(MANUAL));
                }
            }, () => dispatch(setDarkMode(MANUAL)));
        }
    }, [darkMode, dispatch]);

    const checkboxChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setIsDark(e.target.checked));

            if (chrome?.storage) {
                chrome.storage.sync.set({isDarkMode: e.target.checked});
            }
        }, [dispatch]
    );

    return (
        <DarkModeToggleComponent
         darkMode={darkMode}
         isDark={isDark}
         onChange={checkboxChangeHandler}
         searchEngine={searchEngine}/>
    );
};

export default DarkModeToggleContainer;