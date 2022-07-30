import React, {FC, SyntheticEvent} from "react";
import DarkModeToggleComponent from "./dark-mode-toggle.component";
import {useDispatch} from "react-redux";
import {DARK_MODE_ACTIONS} from "../constants/action.constants";

const DarkModeToggleContainer: FC = () => {
    const dispatch = useDispatch();

    const checkboxChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            dispatch(DARK_MODE_ACTIONS.ON);
            document.body.classList.add("dark");
        } else {
            dispatch(DARK_MODE_ACTIONS.OFF);
            document.body.classList.remove("dark");
        }
    };

    return <DarkModeToggleComponent onChange={checkboxChangeHandler}/>
};

export default DarkModeToggleContainer;
