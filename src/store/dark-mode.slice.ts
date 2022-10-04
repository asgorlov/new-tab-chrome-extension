import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

interface DarkModeState {
    checked?: boolean;
}

const initialState: DarkModeState = {};

export const loadDataFromStorage = createAsyncThunk(
    "chrome/storage/get",
    async () => {
        return chrome?.storage?.sync?.get({isDarkMode: false});
    }
);

export const setDataToStorage = createAsyncThunk(
    "chrome/storage/set",
    async (items: { [key: string]: any }) => {
        return chrome?.storage?.sync?.set(items);
    }
);

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        onCheckbox(state) {
            state.checked = true;
        },
        offCheckbox(state) {
            console.log(state);
            state.checked = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadDataFromStorage.fulfilled, (state, action) => {
            state.checked = !!action.payload?.isDarkMode;
        });

        builder.addCase(loadDataFromStorage.rejected, state => {
            state.checked = false;
        });
    }
});

export const selectDarkMode = (state: RootState) => state.darkMode.checked;

export const {onCheckbox, offCheckbox} = darkModeSlice.actions;

export default darkModeSlice.reducer;
