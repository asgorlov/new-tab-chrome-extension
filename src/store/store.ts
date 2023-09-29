import { configureStore } from "@reduxjs/toolkit";
import NewTabReducer from "./new-tab/new-tab.slice";

const store = configureStore({
  reducer: {
    newTab: NewTabReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
