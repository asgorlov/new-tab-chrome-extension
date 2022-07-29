import React, {FC, SyntheticEvent} from "react";
import "../styles/dark-mode-toggle.css"

interface CheckboxProps {
    onChange: (e: SyntheticEvent<HTMLInputElement>) => void
}
const DarkModeToggleComponent: FC<CheckboxProps> = ({onChange}) => {
    return (
        <div className="toggle_btn" id="toggle-btn">
            <input className="toggle_checkbox"
                   type="checkbox"
                   autoComplete="off"
                   onChange={onChange}/>
            <span className="toggle"></span>
        </div>
    );
}

export default DarkModeToggleComponent;
