import {createAction, createReducer} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {DARK_MODE_ACTIONS} from "../constants/action.constants";

const initialState = {
    checked: false
};

const onCheckbox = createAction(DARK_MODE_ACTIONS.ON.type);
const offCheckbox = createAction(DARK_MODE_ACTIONS.OFF.type);

export default createReducer(initialState, (builder) => {
    builder
        .addCase(onCheckbox, (state) => {
            state.checked = true;
        })
        .addCase(offCheckbox, (state) => {
            state.checked = false;
        })
});

export const selectDarkMode = (state: RootState) => state.darkMode.checked;
