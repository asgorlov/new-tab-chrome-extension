import { configureStore } from "@reduxjs/toolkit";
import NewTabReducer from "./new-tab/new-tab.slice";

const store = configureStore({
  reducer: {
    newTab: NewTabReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // игнорируем несериализуемые данные
      serializableCheck: {
        ignoredActions: [
          "newTab/applySettings/fulfilled",
          "newTab/setCustomWallpaper",
          "newTab/setNightPeriod",
          "api/weather/get/rejected",
          "api/weather/get/fulfilled"
        ],
        ignoredPaths: [
          "newTab.customWallpaper.lightTheme",
          "newTab.customWallpaper.darkTheme",
          "newTab.nightPeriod",
          "newTab.weather"
        ]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
