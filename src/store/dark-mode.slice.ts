import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

interface DarkModeState {
    checked?: boolean;
}

export const loadDataFromStorage = createAsyncThunk(
    "chrome/storage/get",
    async () => {
        if (chrome?.storage) {
            return chrome.storage.sync.get({isDarkMode: false});
        } else {
            return {isDarkMode: false};
        }
    }
);

const initialState: DarkModeState = {};

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        onCheckbox(state) {
            state.checked = true;
        },
        offCheckbox(state) {
            state.checked = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadDataFromStorage.fulfilled, (state, action) => {
            state.checked = action.payload.isDarkMode;
        });

        builder.addCase(loadDataFromStorage.rejected, state => {
            state.checked = false;
        });
    }
});

export const selectDarkMode = (state: RootState) => state.darkMode.checked;

export const {onCheckbox, offCheckbox} = darkModeSlice.actions;

export default darkModeSlice.reducer;
