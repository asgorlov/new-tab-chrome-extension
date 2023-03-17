import React, {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from "react";
import DarkModeComponent from "./dark-mode.component";
import {getDarkByLocationTime, selectSunset, setDarkMode, setIsDark} from "../../store/new-tab.slice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store";
import {AUTO, MANUAL} from "../../constants/search-engine.constants";

interface DarkModeContainerProps {
    isDark: boolean;
    darkMode: string;
    searchEngine: string;
}

const DarkModeContainer: FC<DarkModeContainerProps> = ({
    isDark,
    darkMode,
    searchEngine
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const imageRef = useRef<SVGSVGElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sunset = useSelector(selectSunset);

    useEffect(() => {
        const settingsCloseHandler = (event: any) => {
            if(!(imageRef.current?.contains(event?.target) || contentRef.current?.contains(event?.target))) {
                setIsOpen(false);
            }
        };
        window.addEventListener("click", settingsCloseHandler);

        return () => window.removeEventListener("click", settingsCloseHandler);
    }, []);

    useEffect(() => {
        if (darkMode === AUTO) {
            const sunsetDate = sunset ? new Date(sunset) : null;
            const now = new Date();
            if (sunsetDate &&
                sunsetDate.getFullYear() === now.getFullYear() &&
                sunsetDate.getMonth() === now.getMonth() &&
                sunsetDate.getDate() === now.getDate()) {
                dispatch(setIsDark(sunsetDate.getTime() <= now.getTime()));
            } else {
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
        }
    }, [darkMode, sunset, dispatch]);

    const toggleDarkHandler = useCallback(() => {
        if (chrome?.storage) {
            chrome.storage.sync.set({isDark: !isDark});
        }

        dispatch(setIsDark(!isDark));
    }, [isDark, dispatch]);

    const changeDarkModeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        if (chrome?.storage) {
            chrome.storage.sync.set({darkMode: e.target.value});
        }

        dispatch(setDarkMode(e.target.value));
    }, [dispatch]);

    return (
        <DarkModeComponent
         darkMode={darkMode}
         isDark={isDark}
         isOpen={isOpen}
         imageRef={imageRef}
         contentRef={contentRef}
         onClickSwitcher={toggleDarkHandler}
         onClickSettings={() => setIsOpen(!isOpen)}
         onChangeDarkMode={changeDarkModeHandler}
         searchEngine={searchEngine}
        />
    );
};

export default DarkModeContainer;