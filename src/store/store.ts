import {configureStore} from "@reduxjs/toolkit";
import DarkModeReducer from "./dark-mode.slice";

export const store = configureStore({
    reducer: {
        darkMode: DarkModeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
