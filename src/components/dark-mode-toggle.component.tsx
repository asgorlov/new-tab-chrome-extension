import React, {ChangeEvent, FC} from "react";

interface DarkModeToggleComponentProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isDark: boolean;
    darkMode: string;
    searchEngine: string;
}

const DarkModeToggleComponent: FC<DarkModeToggleComponentProps> = ({
    onChange,
    isDark,
    darkMode,
    searchEngine
}) => {
    // toDO: добавить селектор выбора темной темы, если браузер не может определять геолокацию, то кнопка авто неактивна, только ручная
    return (
        <div className="new-tab_toggle-btn">
            <input className="new-tab_toggle-checkbox"
                   type="checkbox"
                   autoComplete="off"
                   onChange={onChange}
                   checked={isDark}
            />
            <span className={`new-tab_toggle-${searchEngine}`}></span>
        </div>
    );
}

export default DarkModeToggleComponent;
