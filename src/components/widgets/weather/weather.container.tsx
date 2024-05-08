import React, { FC, useCallback, useEffect } from "react";
import WeatherComponent from "./weather.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  selectNightPeriod,
  selectWeather,
  selectWeatherSettings
} from "../../../store/new-tab/new-tab.selectors";
import { getWeatherData } from "../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../store/store";
import {
  getAverageTempTextByTimeOfDay,
  getCurrentHourWeatherParams,
  isDayNow,
  shouldBeWeatherDataLoaded
} from "../../../utils/weather.utils";
import { setWeatherSettings } from "../../../store/new-tab/new-tab.slice";

const WeatherContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const weatherSettings = useSelector(selectWeatherSettings);
  const currentLocation = useSelector(selectCurrentLocation);
  const nightPeriod = useSelector(selectNightPeriod);
  const weather = useSelector(selectWeather);

  const updateWeather = useCallback(() => {
    let location = weatherSettings.location;
    if (!location && currentLocation) {
      location = currentLocation;
      dispatch(
        setWeatherSettings({
          ...weatherSettings,
          location
        })
      );
    }

    if (location) {
      dispatch(getWeatherData(location));
    }
  }, [weatherSettings, currentLocation, dispatch]);

  useEffect(() => {
    if (shouldBeWeatherDataLoaded(weather, weatherSettings.location)) {
      updateWeather();
    }
  }, [weather, updateWeather, weatherSettings.location]);

  return (
    <WeatherComponent
      onClickUpdate={updateWeather}
      timeOfDay={isDayNow(nightPeriod) ? "day" : "night"}
      tempByTimeOfDay={getAverageTempTextByTimeOfDay(weather.data)}
      weatherParams={getCurrentHourWeatherParams(weather.data)}
    />
  );
};

export default WeatherContainer;
