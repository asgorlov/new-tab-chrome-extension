import React, { FC, useCallback, useEffect } from "react";
import WeatherComponent from "./weather.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  selectNightPeriod,
  selectWeather
} from "../../../store/new-tab/new-tab.selectors";
import { getWeatherData } from "../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../store/store";
import {
  getAverageTempTextByTimeOfDay,
  getCurrentHourWeatherParams,
  isDayNow,
  shouldBeWeatherDataLoaded
} from "../../../utils/weather.utils";

const WeatherContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentLocation = useSelector(selectCurrentLocation);
  const nightPeriod = useSelector(selectNightPeriod);
  const weather = useSelector(selectWeather);

  const updateWeather = useCallback(() => {
    if (currentLocation) {
      dispatch(getWeatherData(currentLocation));
    }
  }, [currentLocation, dispatch]);

  useEffect(() => {
    if (shouldBeWeatherDataLoaded(weather)) {
      updateWeather();
    }
  }, [weather, updateWeather]);

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
