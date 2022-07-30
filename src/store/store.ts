import {configureStore} from "@reduxjs/toolkit";
import DarkModeReducer from "./dark-mode.reducer";

export const store = configureStore({
    reducer: {
        darkMode: DarkModeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
