import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {SearchEngineEnum} from "../constants/search-engine.constants";

interface DarkModeState {
    checked?: boolean;
    searchEngine?: string;
}

export const loadDataFromStorage = createAsyncThunk(
    "chrome/storage/get",
    async () => {
        const defaultParameters = {
            isDarkMode: false,
            searchEngine: SearchEngineEnum.YANDEX
        };

        if (chrome?.storage) {
            return chrome.storage.sync.get(defaultParameters);
        } else {
            return defaultParameters;
        }
    }
);

const initialState: DarkModeState = {};

export const newTabSlice = createSlice({
    name: "newTab",
    initialState,
    reducers: {
        onCheckbox(state) {
            state.checked = true;
        },
        offCheckbox(state) {
            state.checked = false;
        },
        setSearchEngine(state, action) {
            state.searchEngine = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadDataFromStorage.fulfilled, (state, action) => {
            state.checked = action.payload.isDarkMode;
            state.searchEngine = action.payload.searchEngine;
        });

        builder.addCase(loadDataFromStorage.rejected, state => {
            state.checked = false;
            state.searchEngine = SearchEngineEnum.YANDEX;
        });
    }
});

export const selectDarkMode = (state: RootState) => state.newTab.checked;
export const selectSearchEngine = (state: RootState) => state.newTab.searchEngine;

export const {onCheckbox, offCheckbox, setSearchEngine} = newTabSlice.actions;

export default newTabSlice.reducer;
