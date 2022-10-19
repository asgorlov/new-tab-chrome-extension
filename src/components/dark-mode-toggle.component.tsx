import React, {ChangeEvent, FC} from "react";

interface CheckboxProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

const DarkModeToggleComponent: FC<CheckboxProps> = ({
    onChange,
    checked
}) => {
    return (
        <div className="new-tab_toggle-btn">
            <input className="new-tab_toggle-checkbox"
                   type="checkbox"
                   autoComplete="off"
                   onChange={onChange}
                   checked={checked}
            />
            <span className="new-tab_toggle"></span>
        </div>
    );
}

export default DarkModeToggleComponent;
