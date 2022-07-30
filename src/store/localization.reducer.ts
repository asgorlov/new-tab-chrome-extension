import {createReducer} from "@reduxjs/toolkit";
import {RootState} from "./store";

const initLanguage = () => {
    const nvg = window.navigator;
    return nvg ? nvg.language.substring(0, 2).toLowerCase() : "ru";
};

const initialState = {
    lang: initLanguage()
};

export default createReducer(initialState, {});

export const selectLocalization = (state: RootState) => {
    return state.localization.lang
};
