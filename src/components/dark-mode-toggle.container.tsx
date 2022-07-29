import React, {FC, SyntheticEvent} from "react";
import DarkModeToggleComponent from "./dark-mode-toggle.component";

const DarkModeToggleContainer: FC = () => {
    const checkboxChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };

    return <DarkModeToggleComponent onChange={checkboxChangeHandler}/>
};

export default DarkModeToggleContainer;
