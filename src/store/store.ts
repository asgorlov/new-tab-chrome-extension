import {combineReducers, configureStore} from "@reduxjs/toolkit";
import DarkModeReducer from "./dark-mode.reducer";
import LocalizationReducer from "./localization.reducer";

const rootReducer = combineReducers({
    localization: LocalizationReducer,
    darkMode: DarkModeReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
