import React, {ChangeEvent, FC, RefObject} from "react";
import {ReactComponent as GearIcon} from "../../svgs/gear.svg";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import {AUTO, MANUAL} from "../../constants/search-engine.constants";

interface DarkModeComponentProps {
    onClickSwitcher: () => void;
    onClickSettings: () => void;
    onChangeDarkMode: (event: ChangeEvent<HTMLSelectElement>) => void;
    isDark: boolean;
    isOpen: boolean;
    darkMode: string;
    searchEngine: string;
    imageRef: RefObject<SVGSVGElement>;
    contentRef: RefObject<HTMLDivElement>;
}

const DarkModeComponent: FC<DarkModeComponentProps> = ({
    onClickSwitcher,
    onClickSettings,
    onChangeDarkMode,
    isDark,
    isOpen,
    darkMode,
    searchEngine,
    imageRef,
    contentRef
}) => {
    const {t} = useTranslation();

    return (
        <>
            <div className="new-tab__menu">
                <GearIcon className={clsx(`new-tab__menu-icon-${searchEngine}`, {rotate: isOpen})}
                          ref={imageRef}
                          onClick={onClickSettings}
                />
                <div className={clsx("new-tab__menu-box", {visible: isOpen})}>
                    <div className="new-tab__menu-box-corner"></div>
                    <div className="new-tab__menu-box-content" ref={contentRef}>
                        <h4>{t("darkModeTitle")}</h4>
                        <hr/>
                        <select className="new-tab__menu-box-content_dark-mode"
                                disabled={darkMode === MANUAL && !navigator.geolocation}
                                value={darkMode}
                                onChange={onChangeDarkMode}
                        >
                            <option value={AUTO}>{t(AUTO)}</option>
                            <option value={MANUAL}>{t(MANUAL)}</option>
                        </select>
                        <div className={clsx("new-tab__menu-box-content_dark-switcher", {disabled: darkMode === AUTO})}
                             onClick={onClickSwitcher}
                        >
                            <input type="checkbox" checked={isDark} readOnly={true}/>
                            <span>{t(isDark ? "turnOn" : "turnOff")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DarkModeComponent;
